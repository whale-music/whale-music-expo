import { NativeText, NativeView } from "@/components/Themed";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "@/constants/Theme";
import { Heart, Play } from "lucide-react-native";

export default function MusicPlayerBottomBar({ tabBar, children }: { tabBar?: number; children: ReactNode }) {
    const theme = Theme();
    let { bottom } = useSafeAreaInsets();
    const tabBarHeight = bottom + 56;

    const [enableTabBar, setEnableTabBar] = useState(false);
    const translateY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: -tabBarHeight ?? 0,
            duration: 600,
            easing: Easing.inOut(Easing.linear), // 使用线性曲线
            useNativeDriver: true, // 添加这一行
        }).start();
    }, []);

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            // transform: [{ translateY: -tabBarHeight ?? 0 }],
            width: "100%",
            height: 60,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
        },
        tabBarPlayer: {
            width: "100%",
            borderRadius: 10,
            borderTopColor: "#fff",
            backgroundColor: theme.secondary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            paddingHorizontal: 10,
            paddingRight: 40,
        },
    });

    function BottomBar() {
        if (!enableTabBar) {
            return <></>;
        }
        return (
            <>
                <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
                    <NativeView style={styles.tabBarPlayer}>
                        <NativeView style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent", gap: 10 }}>
                            <Image
                                source={{
                                    uri: "https://images.pexels.com/photos/20720278/pexels-photo-20720278.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                                    height: 50,
                                    width: 50,
                                }}
                                borderRadius={10}
                            />
                            <NativeView style={{ backgroundColor: "transparent" }}>
                                <NativeText style={{ fontSize: 20, fontWeight: "600" }}>Lilac</NativeText>
                                <NativeText style={{ fontSize: 15, fontWeight: "400" }}>Lilac</NativeText>
                            </NativeView>
                        </NativeView>
                        <NativeView style={{ backgroundColor: "transparent", flexDirection: "row", gap: 30 }}>
                            <Heart color={"red"} fill={"red"} size={28}></Heart>
                            <Play fill={theme.accentForeground} color={theme.accentForeground} size={28} />
                        </NativeView>
                    </NativeView>
                </Animated.View>
            </>
        );
    }

    return (
        <>
            {children}
            <BottomBar />
        </>
    );
}
