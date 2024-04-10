import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { NativeView } from "@/components/Themed";
import { KeyRound, ListMusic, Settings, UserRound } from "lucide-react-native";
import { Theme } from "@/constants/Theme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
const size = 28;

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={size} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const theme = Theme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.accentForeground,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                headerStyle: {
                    backgroundColor: theme.background,
                    shadowColor: "transparent",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    tabBarLabel: "User",
                    tabBarIcon: ({ color }) => <UserRound size={size} color={color} />,
                    headerRight: () => (
                        <NativeView style={{ flexDirection: "row" }}>
                            <Link href="/login" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <KeyRound size={25} color={theme.accentForeground} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                                    )}
                                </Pressable>
                            </Link>
                            <Link href="/setting" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <Settings size={25} color={theme.accentForeground} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                                    )}
                                </Pressable>
                            </Link>
                        </NativeView>
                    ),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color }) => <ListMusic size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
