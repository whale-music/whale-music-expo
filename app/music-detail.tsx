import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { Link, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { EllipsisVertical, ListPlus, Play } from "lucide-react-native";
import { Theme } from "@/constants/Theme";
import { getMusicInfo, MobileMusicDetailRes } from "@/api/music";

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
        <>
            <NativeView style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <NativeView style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
                            <Image source={{ uri: musicInfo?.picUrl }} style={{ width: 250, aspectRatio: 1, borderRadius: 20 }} />
                            <NativeView
                                style={{ backgroundColor: "transparent", flexDirection: "column", alignItems: "center", paddingHorizontal: 20 }}
                            >
                                <NativeText style={{ fontSize: 20, fontWeight: "700" }}>{musicInfo?.musicName}</NativeText>
                                <NativeText style={{ fontSize: 15, fontWeight: "400", opacity: 0.6 }}>{musicInfo?.aliasName}</NativeText>
                                <NativeView style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                    <NativeButton>
                                        <NativeView style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Play fill={theme.accentForeground} color={theme.accentForeground} size={20} />
                                            <NativeText>Play</NativeText>
                                        </NativeView>
                                    </NativeButton>
                                    <NativeButton>
                                        <NativeView style={{ flexDirection: "row", alignItems: "center" }}>
                                            <ListPlus size={20} color={theme.accentForeground} />
                                            <NativeText style={{ fontWeight: "600" }}>收藏</NativeText>
                                        </NativeView>
                                    </NativeButton>
                                    {/*<Heart size={28} color={theme.accentForeground} />*/}
                                </NativeView>
                            </NativeView>
                        </NativeView>
                        <NativeView style={{ marginHorizontal: 10 }}>
                            <NativeText style={{ fontSize: 40, fontWeight: "600" }}>音源</NativeText>
                            <NativeView style={{ flexDirection: "column", gap: 10 }}>
                                {musicInfo?.sources.map((v) => {
                                    return (
                                        <>
                                            <NativeView
                                                key={v.id}
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
                                                        backgroundColor:
                                                            v.path === null || v.path === undefined || v.path === "" ? "gray" : "#38b48b",
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 9999,
                                                    }}
                                                />
                                            </NativeView>
                                        </>
                                    );
                                })}
                            </NativeView>
                        </NativeView>
                    </ScrollView>
                </SafeAreaView>
            </NativeView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: StatusBar.currentHeight || 0,
    },
});
