import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, VirtualizedList } from "react-native";
import { NativeText, NativeView } from "@/components/Themed";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { getResource, Resource } from "@/api/resource";
import { AudioLines, CircleHelp, EllipsisVertical, FileVideo, Image } from "lucide-react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/Theme";
import { SheetManager } from "react-native-actions-sheet";
import { audioPreview, imagePreview, resourceFilter } from "@/components/ActionsSheet/sheets";
import { useNavigation } from "expo-router";
import Toast from "react-native-root-toast";

type FilterFieldType = "audio" | "image" | "video";
type SortType = {
    name?: boolean;
    date?: boolean;
    size?: boolean;
};
const initialSortState = {
    name: true,
    date: false,
    size: false,
};
export default function App() {
    const theme = Theme();
    const navigation = useNavigation();

    const [sort, setSort] = useState<SortType>(initialSortState);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState<Resource[]>([]);
    const [filterField, setFilterField] = useState<Array<FilterFieldType>>(["audio", "image", "video"]);
    const [search, setSearch] = useState<string>();

    // 顶栏设置
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={async () => {
                        const sheetValue = await SheetManager.show(resourceFilter, {
                            payload: {
                                value: {
                                    search: search,
                                    filterType: [...filterField],
                                    refresh: refresh,
                                },
                            },
                        });

                        setLoading(true);
                        if (sheetValue?.refresh) {
                            setRefresh(true);
                            await init();
                        } else {
                            setRefresh(false);
                        }

                        setFilterField(sheetValue?.filterType ? [...sheetValue.filterType] : []);
                        setSearch(sheetValue?.search ?? undefined);

                        if (sheetValue?.sort) {
                            setSort(sheetValue.sort);
                        } else {
                            setSort(initialSortState);
                        }
                        setLoading(false);
                    }}
                >
                    {({ pressed }) => (
                        <EllipsisVertical size={25} color={theme.cardForeground} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                    )}
                </Pressable>
            ),
        });
    }, [filterField, search]);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        setLoading(true);
        try {
            const r = await getResource(refresh);
            setResources(r);
        } finally {
            setLoading(false);
        }
    }

    const searchHandle = (v: Resource) =>
        search == null || search?.trim().length === 0 ? true : search && v.name.toLowerCase().includes(search.toLowerCase());

    const nameSortHandle = (a: Resource, b: Resource) => {
        if (sort?.name) {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    };

    const dateSortHandle = (a: Resource, b: Resource) => {
        const createTime = new Date(a.creationTime).getTime();
        const updateTime = new Date(b.creationTime).getTime();
        if (sort?.date) {
            return createTime - updateTime;
        } else {
            return updateTime - createTime;
        }
    };

    const sizeSortHandle = (a: Resource, b: Resource) => {
        if (sort?.size) {
            return a.size - b.size;
        } else {
            return b.size - a.size;
        }
    };

    const filterResource = useMemo(() => {
        const r = resources.filter((v) => {
            return searchHandle(v) && filterField.includes(v.type as FilterFieldType);
        });

        sort?.name && r.sort(nameSortHandle);
        sort?.date && r.sort(dateSortHandle);
        sort?.size && r.sort(sizeSortHandle);
        return r;
    }, [resources, filterField, search, sort]);

    const getItem = (_data: Resource, index: number): Resource => {
        return filterResource[index];
    };

    function Icon({ type }: { type: string | FilterFieldType }) {
        const light = (useColorScheme() ?? "light") === "light";
        const iconColor = light ? "#000" : "#fff";
        if (type === "audio") {
            return <AudioLines size={28} color={iconColor} />;
        }
        if (type === "image") {
            return <Image size={28} color={iconColor} />;
        }
        if (type === "video") {
            return <FileVideo size={28} color={iconColor} />;
        }
        return <CircleHelp size={28} color={iconColor} />;
    }

    function Item({ value }: { value: Resource }) {
        const resource = value;
        const onPress = async () => {
            if (resource.type === "audio") {
                await SheetManager.show(audioPreview, {
                    payload: { value: resource },
                });
                return;
            }
            if (resource.type === "image") {
                await SheetManager.show(imagePreview, {
                    payload: { value: resource },
                });
                return;
            }
            if (resource.type === "video") {
                Toast.show("Video is not supported");
                return;
            }
            Toast.show("Unknown type");
        };
        return (
            <>
                <TouchableOpacity style={{ backgroundColor: theme.background }} onPress={onPress}>
                    <NativeView style={[{ opacity: resource.status ? 1 : 0.5 }, styles.item]}>
                        <Icon type={value.type} />
                        <NativeView style={styles.itemTitle}>
                            <NativeText numberOfLines={1}>{resource.name}</NativeText>
                            <NativeText numberOfLines={1} style={{ opacity: 0.4 }}>
                                {resource.path}
                            </NativeText>
                        </NativeView>
                    </NativeView>
                </TouchableOpacity>
            </>
        );
    }

    if (loading) {
        return <LoadingResource />;
    }

    if (filterResource.length === 0) {
        return (
            <NativeView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <NativeText style={{ fontSize: 30 }}>无数据</NativeText>
            </NativeView>
        );
    }

    return (
        <>
            <Suspense fallback={<LoadingResource />}>
                <SafeAreaView>
                    <VirtualizedList
                        initialNumToRender={20}
                        renderItem={({ item }) => <Item value={item} />}
                        keyExtractor={(item) => item.path}
                        getItemCount={() => filterResource.length}
                        getItem={getItem}
                        ItemSeparatorComponent={ItemSeparator}
                    />
                </SafeAreaView>
            </Suspense>
        </>
    );
}

const ItemSeparator = () => (
    <NativeView style={{ flexDirection: "row-reverse" }}>
        <NativeView style={styles.separator} />
    </NativeView>
);

function LoadingResource() {
    return (
        <NativeView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </NativeView>
    );
}

const styles = StyleSheet.create({
    item: {
        marginLeft: "6%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        margin: 10,
    },
    separator: {
        width: "85%",
        height: 1,
        backgroundColor: "gray",
        opacity: 0.3,
    },
    itemTitle: {
        width: "80%",
    },
});
