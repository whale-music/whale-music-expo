import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { getUserInfo, UserInfoRes } from "@/api/user";
import { Theme } from "@/constants/Theme";
import { ChevronRight } from "lucide-react-native";
import { AnimatableNumericValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { getNewAlbums, getNewArtist, getNewMusic } from "@/api/recommend";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

const expirationTime = 24 * 60 * 60 * 1000;

export default function Index() {
    const theme = Theme();
    const navigation = useNavigation();
    // Access the client
    const queryClient = useQueryClient();

    const [userInfo, setUserInfo] = useState<UserInfoRes>();
    const queriesResults = useQueries({
        queries: [
            { queryKey: ["music", 1], queryFn: getNewMusic, staleTime: expirationTime },
            { queryKey: ["artist", 2], queryFn: getNewArtist, staleTime: expirationTime },
            { queryKey: ["album", 2], queryFn: getNewAlbums, staleTime: expirationTime },
        ],
    });
    const [music, artist, album] = queriesResults;

    // Mutations
    const mutationNewMusic = useMutation({
        mutationFn: getNewMusic,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["music"] });
        },
    });
    const mutationNewArtist = useMutation({
        mutationFn: getNewArtist,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["album"] });
        },
    });
    const mutationNewAlbums = useMutation({
        mutationFn: getNewAlbums,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["artist"] });
        },
    });

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

    function musicContent() {
        if (music.isSuccess) {
            return music.data.map((v) => (
                <View key={v.musicId}>
                    <Pressable onPress={() => router.push({ pathname: "/music-detail", params: { id: v.musicId } })}>
                        <Image source={{ uri: v.picUrl }} resizeMode="center" style={{ width: "100%", aspectRatio: 1 }} borderRadius={20} />
                    </Pressable>
                    <NativeText style={{ fontSize: 15, fontWeight: "500" }} numberOfLines={1} ellipsizeMode="tail">
                        {v.musicName}
                    </NativeText>
                </View>
            ));
        } else {
            return [];
        }
    }

    function artistContent() {
        if (artist.isSuccess) {
            return artist.data.map((v) => (
                <View key={v.artistId}>
                    <Pressable onPress={() => router.push({ pathname: "/artist-detail", params: { id: v.artistId } })}>
                        <Image source={{ uri: v.picUrl }} resizeMode="center" style={{ width: "100%", aspectRatio: 1 }} borderRadius={9999} />
                    </Pressable>
                    <NativeText style={{ fontSize: 15, textAlign: "center", fontWeight: "500" }} numberOfLines={1} ellipsizeMode="tail">
                        {v.artistName}
                    </NativeText>
                </View>
            ));
        } else {
            return [];
        }
    }

    function albumContent() {
        if (album.isSuccess) {
            return album.data.map((v) => (
                <View key={v.albumId}>
                    <Pressable onPress={() => router.push({ pathname: "/album-detail", params: { id: v.albumId } })}>
                        <Image source={{ uri: v.picUrl }} resizeMode="center" style={{ width: "100%", aspectRatio: 1 }} borderRadius={20} />
                    </Pressable>
                    <NativeText style={{ fontSize: 15, fontWeight: "500" }} numberOfLines={1} ellipsizeMode="tail">
                        {v.albumName}
                    </NativeText>
                </View>
            ));
        } else {
            return [];
        }
    }

    function Content() {
        if (queriesResults.map((value) => value.isLoading).some((v) => v)) {
            return <NativeText>Loading...</NativeText>;
        }
        if (queriesResults.map((value) => value.isLoadingError).some((v) => v)) {
            return <>{queriesResults.map((v) => v.error).join("\n")}</>;
        }
        return (
            <>
                <RecommendedContainer title="New Music" content={() => musicContent()} />
                <RecommendedContainer title="New Artist" borderRadius={9999} content={() => artistContent()} />
                <RecommendedContainer title="New Album" content={() => albumContent()} />
            </>
        );
    }

    function refreshDate() {
        mutationNewMusic.mutate();
        mutationNewAlbums.mutate();
        mutationNewArtist.mutate();
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={queriesResults.map((value) => value.isLoading).some((v) => v)}
                    onRefresh={refreshDate}
                    colors={["#007AFF"]} // 设置刷新指示器的颜色
                    progressBackgroundColor="#FFFFFF" // 设置刷新指示器的背景色
                />
            }
            style={{ flex: 1, backgroundColor: theme.background }}
            contentInsetAdjustmentBehavior="automatic"
        >
            <Content />
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
