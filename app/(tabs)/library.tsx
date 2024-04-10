import { FlatList, Image, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { NativeText, NativeView } from "@/components/Themed";
import { Theme } from "@/constants/Theme";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { getUserStoreData } from "@/store/user";
import { getUserPlaylistAll, PlayListAllRes } from "@/api/playlist";

export default function Library() {
    const theme = Theme();
    const navigation = useNavigation();

    const [userId, setUserId] = useState<number>();
    const [playlist, setPlaylist] = useState<PlayListAllRes[]>([]);

    useEffect(() => {
        navigation.setOptions({
            title: "歌单", // 设置顶栏标题为 'New Title'
            headerTitleStyle: {
                fontWeight: "700", // 设置顶栏标题的字体加粗
                fontSize: 30,
            },
        });
    }, []);

    useEffect(() => {
        (async function () {
            const r = await getUserStoreData();
            setUserId(r?.id);
        })();
    }, []);

    useEffect(() => {
        (async function () {
            if (userId) {
                const r = await getUserPlaylistAll(userId);
                setPlaylist(r);
            }
        })();
    }, [userId]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        card: {
            margin: 10,
            padding: 20,
            borderRadius: 10,
            backgroundColor: theme.muted,
        },
    });

    const Item = ({ playlist }: { playlist: PlayListAllRes }) => (
        <Pressable
            style={({ pressed }) => [
                { flexDirection: "row", alignItems: "center", gap: 10, padding: 10 },
                {
                    backgroundColor: pressed ? theme.accent : theme.background,
                    opacity: pressed ? 0.8 : 1,
                },
            ]}
        >
            <Image source={{ uri: playlist.picUrl }} width={70} style={{ aspectRatio: 1 }} borderRadius={10} />
            <NativeText style={{ fontSize: 22, fontWeight: "600" }}>{playlist.playListName}</NativeText>
        </Pressable>
    );

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Pressable
                    style={({ pressed }) => [
                        styles.card,
                        {
                            opacity: pressed ? 0.7 : 1,
                        },
                    ]}
                >
                    <NativeView style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" }}>
                        <NativeText style={{ fontSize: 20 }}>用户</NativeText>
                        <ChevronDown size={28} color={theme.accentForeground} />
                    </NativeView>
                </Pressable>
                <FlatList data={playlist} renderItem={({ item }) => <Item playlist={item} />} keyExtractor={(item) => `${item.id}`} />
            </SafeAreaView>
        </>
    );
}
