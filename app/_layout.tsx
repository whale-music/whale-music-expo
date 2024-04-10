import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Theme as ThemeType, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { RootSiblingParent } from "react-native-root-siblings";
import { SheetProvider } from "react-native-actions-sheet";
import { Theme } from "@/constants/Theme";
import Colors from "@/constants/Colors";
import MusicPlayerBottomBar from "@/components/MusicPlayerBottomBar";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const themeColor = Theme();

    const lightColor = Colors["light"];
    const darkColor = Colors["dark"];

    const lightTheme: ThemeType = {
        dark: false,
        colors: {
            primary: lightColor.primary,
            background: lightColor.background,
            card: lightColor.card,
            text: lightColor.accentForeground,
            border: lightColor.border,
            notification: lightColor.destructive,
        },
    };
    const darkTheme: ThemeType = {
        dark: true,
        colors: {
            primary: darkColor.primary,
            background: darkColor.background,
            card: darkColor.card,
            text: darkColor.foreground,
            border: darkColor.border,
            notification: darkColor.destructive,
        },
    };
    return (
        <RootSiblingParent>
            <SheetProvider>
                <ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
                    <MusicPlayerBottomBar>
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                            <Stack.Screen name="setting" options={{ presentation: "modal" }} />
                            <Stack.Screen
                                name="login"
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="playlist-detail"
                                options={{
                                    title: "",
                                    headerTransparent: true,
                                    headerBackTitleVisible: false,
                                }}
                            />
                        </Stack>
                    </MusicPlayerBottomBar>
                </ThemeProvider>
            </SheetProvider>
        </RootSiblingParent>
    );
}
