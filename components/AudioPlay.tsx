import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Audio, AudioMode } from "expo-av";
import { InterruptionModeAndroid, InterruptionModeIOS } from "expo-av/src/Audio.types";
import { AVPlaybackStatus } from "expo-av/src/AV";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Slider from "@react-native-community/slider";
import Toast from "react-native-root-toast";

export default function AudioPlay({ name, url, style }: { name: string; url: string; style: StyleProp<ViewStyle> }) {
    const [audioSound, setAudioSound] = useState<Audio.Sound>();

    const [avPlaybackStatus, setAVPlaybackStatus] = useState<AVPlaybackStatus>();

    async function init(defaultConfigs = {}) {
        try {
            const configs = {
                allowsRecordingIOS: false,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: false,
                ...defaultConfigs,
            } as Partial<AudioMode>;

            await Audio.setAudioModeAsync(configs);
            console.log("init audio");
        } catch (error) {
            console.log(`[Audio Error][init]: ${error}`);
            Toast.show(`audio init error ${error}`);
        }
    }

    useEffect(() => {
        init();
    }, []);

    async function playSound() {
        if (audioSound) {
            await audioSound.playAsync();
            return;
        }

        let source = { uri: url };
        const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
            setAVPlaybackStatus(status);
        };
        const { sound } = await Audio.Sound.createAsync(source, {}, onPlaybackStatusUpdate);
        setAudioSound(sound);

        await sound.playAsync();
    }

    const setSeek = (val: number) => {
        audioSound?.setPositionAsync(val);
    };

    useEffect(() => {
        return audioSound
            ? () => {
                  console.log("Unloading Sound");
                  audioSound.unloadAsync();
              }
            : undefined;
    }, [audioSound]);

    function LoadSuccess() {
        const audioStatus = avPlaybackStatus as AVPlaybackStatusSuccess;

        if (audioStatus?.isBuffering) {
            return <NativeText style={{ fontSize: 20 }}>loading...</NativeText>;
        }

        return (
            <>
                <NativeView style={[styles.buttonContainer, style]}>
                    <NativeText style={{ fontSize: 15 }}>{name}</NativeText>
                    <NativeView style={[{ flexDirection: "row", alignItems: "center", width: "100%" }, style]}>
                        <NativeText style={{ opacity: 0.5 }}>{lastSeconds(audioStatus?.positionMillis, audioStatus?.durationMillis)}</NativeText>
                        <Slider
                            style={{ flexGrow: 1 }}
                            minimumValue={0}
                            maximumValue={audioStatus?.durationMillis}
                            minimumTrackTintColor="#FFFFFF" // 设置已填充轨道的颜色
                            maximumTrackTintColor="#9E9E9E" // 设置未填充轨道的颜色
                            thumbTintColor="#fff" // 设置滑块的颜色
                            value={audioStatus?.positionMillis || 0}
                            onValueChange={setSeek}
                            disabled={!audioStatus?.isPlaying}
                            tapToSeek={true}
                        />
                        <NativeText style={{ opacity: 0.5 }}>{secondsToTime(audioStatus?.durationMillis)}</NativeText>
                    </NativeView>
                    {audioStatus?.isPlaying ? (
                        <NativeButton
                            style={{ backgroundColor: "white", borderWidth: 1 }}
                            textStyle={{ color: "black" }}
                            onPress={() => audioSound?.pauseAsync()}
                        >
                            暂停
                        </NativeButton>
                    ) : (
                        <NativeButton style={{ backgroundColor: "white", borderWidth: 1 }} textStyle={{ color: "black" }} onPress={playSound}>
                            播放
                        </NativeButton>
                    )}
                </NativeView>
            </>
        );
    }

    return (
        <NativeView>
            <LoadSuccess />
        </NativeView>
    );
}

function lastSeconds(current: number | undefined, seconds: number | undefined) {
    if (!current || !seconds) {
        return "00:00";
    }
    return "-" + secondsToTime(seconds - current);
}

// 将秒转化成时分秒
function secondsToTime(seconds: number | undefined) {
    if (!seconds) {
        return "00:00";
    }
    seconds = seconds / 1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "column",
        gap: 5,
        justifyContent: "space-around",
    },
    playInfoText: {
        color: "white",
        textAlign: "center",
    },
    sliderContainer: {},
    line: {
        width: 100,
        height: 4,
        backgroundColor: "red",
        zIndex: 1,
    },
    slider: {
        position: "relative",
        left: 0,
        top: 0,
    },
});
