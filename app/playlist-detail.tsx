import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { CollectInfoRes, getPlayListInfo, getPlaylistMusicPage, PlaylistMusicPageReq, PlaylistMusicPageRes } from "@/api/playlist";
import { Theme } from "@/constants/Theme";
import { Ellipsis, EllipsisVertical } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";

export default function PlaylistDetail() {
    const navigation = useNavigation();

    const route = useRoute();
    const theme = Theme();
    const { id } = route.params as { id: number };
    const [pageReq, setPageReq] = useState<PlaylistMusicPageReq>({ id: id, musicName: "", pageIndex: 0, pageNum: 50 });
    const [pageRes, setPageRes] = useState<PlaylistMusicPageRes[]>([]);
    const [playlistInfo, setPlaylistInfo] = useState<CollectInfoRes>();
    const [loading, setLoading] = useState(false);
    const [isListEnd, setIsListEnd] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <TouchableOpacity>
                        <EllipsisVertical size={28} color={theme.accentForeground} />
                    </TouchableOpacity>
                </>
            ),
        });
    }, []);

    useEffect(() => {
        (async function () {
            setPlaylistInfo(await getPlayListInfo(id));
        })();
    }, []);

    async function getPage() {
        if (!loading && !isListEnd) {
            setLoading(true);
            const r = await getPlaylistMusicPage(pageReq);
            if (r?.content?.length > 0 && r?.total > 0) {
                pageReq.pageIndex = r.current;
                pageReq.pageNum = r.size;
                pageReq.pageIndex++;
                setPageReq({ ...pageReq });
                setPageRes([...pageRes, ...r.content]);
            } else {
                setIsListEnd(true);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        getPage();
    }, []);

    const renderFooter = () => {
        return (
            //Footer View with Loader
            <View style={styles.footer}>{loading ? <ActivityIndicator style={{ margin: 15 }} /> : null}</View>
        );
    };

    return (
        <ImageBackground
            source={{ uri: playlistInfo?.picUrl }}
            resizeMode="cover"
            blurRadius={50}
            style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", height: 280 }}
        >
            <NativeView style={styles.imageOverlay} />
            <FlatList
                style={{ width: "100%", backgroundColor: "transparent" }}
                data={pageRes}
                onEndReached={getPage}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => `${item.id}`}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={() => (
                    <>
                        <ImageBackground
                            source={{ uri: playlistInfo?.picUrl }}
                            resizeMode="cover"
                            blurRadius={50}
                            style={[{ flex: 1, justifyContent: "flex-end", alignItems: "center", height: 280 }, styles.imageOverlay]}
                        />
                        <LinearGradient
                            // Background Linear Gradient
                            colors={["transparent", theme.background]}
                            locations={[0, 0.8]}
                            style={styles.imageOverlay}
                        />
                        <NativeView style={styles.imageOverlay} />
                        <NativeView style={[styles.imageContainer, { backgroundColor: "transparent" }]}>
                            <Image
                                source={{ uri: playlistInfo?.picUrl }}
                                width={180}
                                style={{
                                    aspectRatio: 1,
                                    marginBottom: 10,
                                    backgroundColor: "transparent",
                                }}
                                borderRadius={10}
                            />
                        </NativeView>
                        <NativeView style={styles.playlistInfo}>
                            <NativeText style={{ fontSize: 30, fontWeight: "700" }}>{playlistInfo?.playListName}</NativeText>
                            <NativeText style={{ fontSize: 20, opacity: 0.5, fontWeight: "500" }}>By {playlistInfo?.nickname}</NativeText>
                        </NativeView>
                        <NativeView style={{ flex: 1, alignItems: "center" }}>
                            <NativeView style={{ flexDirection: "row" }}>
                                <NativeButton style={{ backgroundColor: theme.primary }} textStyle={{ color: theme.accent }}>
                                    Play
                                </NativeButton>
                                <NativeButton
                                    style={{ backgroundColor: "transparent", borderColor: theme.primary, borderWidth: 1 }}
                                    textStyle={{ color: theme.primary }}
                                >
                                    收藏
                                </NativeButton>
                            </NativeView>
                        </NativeView>
                    </>
                )}
                contentContainerStyle={{ width: "100%", backgroundColor: theme.background }}
                renderItem={(info) => <MusicItem value={info.item}></MusicItem>}
            />
        </ImageBackground>
    );
}

function MusicItem({ value }: { value: PlaylistMusicPageRes }) {
    const theme = Theme();
    return (
        <>
            <NativeView style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <NativeView
                    style={{ flexDirection: "row", width: "90%", alignItems: "center", paddingHorizontal: 20, padding: 5, gap: 10, height: 70 }}
                >
                    <Image source={{ uri: value.picUrl }} width={60} style={{ aspectRatio: 1 }} />
                    <NativeView style={{ flex: 1, flexDirection: "column", height: "100%", justifyContent: "space-around" }}>
                        <NativeText style={{ fontSize: 16, fontWeight: "500", width: "100%" }} numberOfLines={1} ellipsizeMode="tail">
                            {value.musicName}
                        </NativeText>
                        <NativeText style={{ fontSize: 13, fontWeight: "400", opacity: 0.8 }}>{value.artistNames}</NativeText>
                    </NativeView>
                </NativeView>
                <NativeView style={{ paddingRight: 10 }}>
                    <Ellipsis size={28} color={theme.accentForeground} style={{ opacity: 0.8 }} />
                </NativeView>
            </NativeView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    playlistInfo: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "transparent",
        marginTop: 100,
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        height: 300,
        backgroundColor: "rgba(0,0,0,0.14)",
    },
    footer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});
