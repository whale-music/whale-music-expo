import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { Link, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { EllipsisVertical, ListPlus, Play } from "lucide-react-native";
import { Theme } from "@/constants/Theme";
import { getMusicInfo, MobileMusicDetailRes } from "@/api/music";
import { SheetManager } from "react-native-actions-sheet";
import { audioPreview } from "@/components/ActionsSheet/sheets";

export default function musicDetail() {
    const theme = Theme();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: number };
    // const id = 454598440706181;
    const [musicInfo, setMusicInfo] = useState<MobileMusicDetailRes>();
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Link href="/" asChild>
                    <Pressable>
                        {({ pressed }) => <EllipsisVertical size={25} color={theme.accentForeground} style={{ opacity: pressed ? 0.5 : 1 }} />}
                    </Pressable>
                </Link>
            ),
        });
    }, []);

    useEffect(() => {
        (async function () {
            setMusicInfo(await getMusicInfo(id));
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NativeView style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
                    <Image source={{ uri: musicInfo?.picUrl }} style={{ width: 250, aspectRatio: 1, borderRadius: 20 }} />
                    <NativeView style={{ backgroundColor: "transparent", flexDirection: "column", alignItems: "center", paddingHorizontal: 20 }}>
                        <NativeText style={{ fontSize: 20, fontWeight: "700" }}>{musicInfo?.musicName}</NativeText>
                        <NativeText style={{ fontSize: 15, fontWeight: "400", opacity: 0.6 }}>{musicInfo?.aliasName}</NativeText>
                        <NativeView style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <NativeButton
                                style={{ backgroundColor: "white" }}
                                textStyle={{ color: "#000" }}
                                icon={<Play fill="#000" color="#000" size={20} />}
                            >
                                Play
                            </NativeButton>
                            <NativeButton style={{ borderColor: theme.accent }} icon={<ListPlus size={20} color={theme.accentForeground} />}>
                                star
                            </NativeButton>
                        </NativeView>
                    </NativeView>
                </NativeView>
                <NativeView style={{ marginHorizontal: 10 }}>
                    <NativeText style={{ fontSize: 40, fontWeight: "600" }}>音源</NativeText>
                    <NativeView style={{ flexDirection: "column", gap: 10 }}>
                        {musicInfo?.sources.map((v) => {
                            return (
                                <TouchableOpacity
                                    key={v.id}
                                    onPress={() =>
                                        SheetManager.show(audioPreview, {
                                            payload: { value: { name: v.md5, url: v.url } },
                                        })
                                    }
                                >
                                    <NativeView
                                        style={{
                                            backgroundColor: theme.card,
                                            borderWidth: 1,
                                            borderColor: theme.cardForeground,
                                            borderRadius: 10,
                                            height: 50,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <NativeText style={{ fontSize: 12, fontWeight: "500", opacity: 0.5 }}>{v.md5}</NativeText>
                                        <NativeView
                                            style={{
                                                backgroundColor: v.path === null || v.path === undefined || v.path === "" ? "gray" : "#38b48b",
                                                width: 10,
                                                height: 10,
                                                borderRadius: 9999,
                                            }}
                                        />
                                    </NativeView>
                                </TouchableOpacity>
                            );
                        })}
                    </NativeView>
                </NativeView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: StatusBar.currentHeight || 0,
    },
});
