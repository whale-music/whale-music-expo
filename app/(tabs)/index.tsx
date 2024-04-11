import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { getUserInfo, UserInfoRes } from "@/api/user";
import { Theme } from "@/constants/Theme";
import { ChevronRight } from "lucide-react-native";
import { AnimatableNumericValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { getNewAlbums, getNewArtist, getNewMusic, NewAlbumRes, NewArtistRes, NewMusicRes } from "@/api/recommend";

export default function TabOneScreen() {
    const theme = Theme();
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState<UserInfoRes>();

    const [newMusic, setNewMusic] = useState<NewMusicRes[]>([]);
    const [newArtist, setNewArtist] = useState<NewArtistRes[]>([]);
    const [newAlbum, setNewAlbum] = useState<NewAlbumRes[]>([]);

    useEffect(() => {
        (async function () {
            const r = await getUserInfo();
            setUserInfo(r);
        })();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            // 使用 title 属性来设置顶栏标题
            // title: "",
            headerLeft: () => (
                <>
                    <NativeView style={{ marginLeft: 10, flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Image source={{ uri: userInfo?.avatarUrl, width: 30 }} style={{ aspectRatio: 1 }} />
                        <NativeText style={{ fontSize: 20 }}>{userInfo?.username}</NativeText>
                    </NativeView>
                </>
            ),
        });
    }, [userInfo?.username]);

    useEffect(() => {
        (async function () {
            setNewMusic(await getNewMusic());
            setNewArtist(await getNewArtist());
            setNewAlbum(await getNewAlbums());
        })();
    }, []);

    if (!userInfo && userInfo === undefined) {
        return (
            <>
                <NativeView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <NativeButton style={{ backgroundColor: "white" }} textStyle={{ color: "black" }} onPress={() => router.replace("/login")}>
                        登录
                    </NativeButton>
                </NativeView>
            </>
        );
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentInsetAdjustmentBehavior="automatic">
            <RecommendedContainer
                title="New Music"
                content={() => {
                    return newMusic.map((v) => (
                        <View key={v.musicId}>
                            <Pressable onPress={() => router.push({ pathname: "/music-detail", params: { id: v.musicId } })}>
                                <Image source={{ uri: v.picUrl }} resizeMode="center" style={{ width: "100%", aspectRatio: 1 }} borderRadius={20} />
                            </Pressable>
                            <NativeText style={{ fontSize: 15, fontWeight: "500" }} numberOfLines={1} ellipsizeMode="tail">
                                {v.musicName}
                            </NativeText>
                        </View>
                    ));
                }}
            />
            <RecommendedContainer
                title="New Artist"
                borderRadius={9999}
                content={() => {
                    return newArtist.map((v) => (
                        <View key={v.artistId}>
                            <Pressable onPress={() => router.push({ pathname: "/artist-detail", params: { id: v.artistId } })}>
                                <Image source={{ uri: v.picUrl }} resizeMode="center" style={{ width: "100%", aspectRatio: 1 }} borderRadius={9999} />
                            </Pressable>
                            <NativeText style={{ fontSize: 15, textAlign: "center", fontWeight: "500" }} numberOfLines={1} ellipsizeMode="tail">
                                {v.artistName}
                            </NativeText>
                        </View>
                    ));
                }}
            />
            <RecommendedContainer
                title="New Album"
                content={() => {
                    return newAlbum.map((v) => (
                        <View key={v.albumId}>
                            <Pressable onPress={() => router.push({ pathname: "/album-detail", params: { id: v.albumId } })}>
                                <Image source={{ uri: v.picUrl }} resizeMode="center" style={{ width: "100%", aspectRatio: 1 }} borderRadius={20} />
                            </Pressable>
                            <NativeText style={{ fontSize: 15, fontWeight: "500" }} numberOfLines={1} ellipsizeMode="tail">
                                {v.albumName}
                            </NativeText>
                        </View>
                    ));
                }}
            />
        </ScrollView>
    );
}

function RecommendedContainer({
    title,
    content = () => [],
    borderRadius = 20,
}: {
    title: string;
    content?: () => React.ReactNode[];
    borderRadius?: AnimatableNumericValue | undefined;
}) {
    const theme = Theme();

    if (content().length === 0) {
        return (
            <NativeView style={styles.container}>
                <NativeView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center" }}>
                    <NativeText style={{ fontSize: 30, fontWeight: "600" }}>{title}</NativeText>
                    <ChevronRight size={28} color={theme.accentForeground} />
                </NativeView>
                <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: "row", gap: 10 }}>
                    <NativeView style={{ width: 150, height: 150, backgroundColor: "gray", borderRadius: borderRadius }}></NativeView>
                    <NativeView style={{ width: 150, height: 150, backgroundColor: "gray", borderRadius: borderRadius }}></NativeView>
                    <NativeView style={{ width: 150, height: 150, backgroundColor: "gray", borderRadius: borderRadius }}></NativeView>
                    <NativeView style={{ width: 150, height: 150, backgroundColor: "gray", borderRadius: borderRadius }}></NativeView>
                    <NativeView style={{ width: 150, height: 150, backgroundColor: "gray", borderRadius: borderRadius }}></NativeView>
                    <NativeView style={{ width: 150, height: 150, backgroundColor: "gray", borderRadius: borderRadius }}></NativeView>
                </ScrollView>
            </NativeView>
        );
    }

    return (
        <NativeView style={styles.container}>
            <NativeView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center" }}>
                <NativeText style={{ fontSize: 30, fontWeight: "600" }}>{title}</NativeText>
                <ChevronRight size={28} color={theme.accentForeground} />
            </NativeView>
            <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: "row", gap: 10 }}>
                {content().map((v, index) => {
                    return (
                        <NativeView key={index} style={{ width: 150, height: 185, flexDirection: "column", gap: 5 }}>
                            {v}
                        </NativeView>
                    );
                })}
            </ScrollView>
        </NativeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "transparent",
    },
});
