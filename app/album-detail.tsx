import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { EllipsisVertical, ListPlus, Play } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Theme";
import { Link, router, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { getAlbumDetail, MobileAlbumDetailRes } from "@/api/album";

export default function albumDetail() {
    const theme = Theme();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: number };

    const [artistDetail, setArtistDetail] = useState<MobileAlbumDetailRes>();
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
            setArtistDetail(await getAlbumDetail(id));
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NativeView style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
                    <Image source={{ uri: artistDetail?.picUrl }} style={{ width: 200, aspectRatio: 1, borderRadius: 20 }} />
                    <NativeView style={{ backgroundColor: "transparent", flexDirection: "column", alignItems: "center", paddingHorizontal: 20 }}>
                        <NativeText style={{ fontSize: 20, fontWeight: "700" }}>{artistDetail?.albumName}</NativeText>
                        <NativeView style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <NativeButton
                                style={{ backgroundColor: "white" }}
                                icon={<Play fill="#000" color="#000" size={20} />}
                                textStyle={{ color: "#000" }}
                            >
                                Play
                            </NativeButton>
                            <NativeButton style={{ borderColor: theme.accent }} icon={<ListPlus size={20} color={theme.accentForeground} />}>
                                <NativeText style={{ fontWeight: "600" }}>收藏</NativeText>
                            </NativeButton>
                        </NativeView>
                    </NativeView>
                </NativeView>
                <NativeView style={{ marginHorizontal: 10 }}>
                    <NativeView style={{ flexDirection: "column", gap: 10 }}>
                        {artistDetail?.musicList.map((v, index) => {
                            return (
                                <TouchableOpacity key={v.id} onPress={() => router.push({ pathname: "/music-detail", params: { id: v.id } })}>
                                    <NativeView
                                        style={{
                                            backgroundColor: theme.card,
                                            borderRadius: 10,
                                            height: 50,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingLeft: 5,
                                            paddingRight: 10,
                                        }}
                                    >
                                        <NativeView style={{ flexDirection: "row", alignItems: "center", backgroundColor: "transparent" }}>
                                            <NativeView
                                                style={{
                                                    width: "10%",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "transparent",
                                                }}
                                            >
                                                <NativeText style={{ fontSize: 18, opacity: 0.5 }}>{index + 1}</NativeText>
                                            </NativeView>
                                            <NativeView style={{ width: "80%", backgroundColor: "transparent" }}>
                                                <NativeText style={{ fontSize: 18, fontWeight: "500" }} numberOfLines={1}>
                                                    {v.musicName}
                                                </NativeText>
                                            </NativeView>
                                        </NativeView>
                                        <NativeView>
                                            <EllipsisVertical fill={theme.accentForeground} color={theme.accentForeground} size={20} />
                                        </NativeView>
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
