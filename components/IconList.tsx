import React from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { NativeText, NativeView } from "@/components/Themed";
import { ChevronRight, Package } from "lucide-react-native";
import { Theme } from "@/constants/Theme";

const libraryDate = [
    {
        title: "文件存储",
    },
    {
        title: "Second Item",
    },
];

type ItemProps = { title: string };

const App = () => {
    const themeColor = Theme();
    const Item = ({ title }: ItemProps) => (
        <TouchableOpacity style={styles.item}>
            <Package size={28} color={themeColor.accentForeground} style={{ marginHorizontal: "4%" }}></Package>
            <NativeText style={styles.title}>{title}</NativeText>
            <ChevronRight size={28} color={themeColor.accentForeground} style={{ marginHorizontal: "4%", opacity: 0.6 }} />
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={libraryDate}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={(item) => item.title}
                ItemSeparatorComponent={ItemSeparator}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        width: "70%",
        fontSize: 20,
        paddingVertical: 8,
    },
});

const ItemSeparator = () => (
    <NativeView
        style={{
            flexDirection: "row-reverse",
        }}
    >
        <NativeView
            style={{
                height: 1,
                width: "85%",
                backgroundColor: "gray",
                opacity: 0.2,
            }}
        />
    </NativeView>
);

export default App;
