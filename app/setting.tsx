import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { NativeButton, NativeView } from "@/components/Themed";
import { removeUserStore } from "@/store/user";
import Toast from "react-native-root-toast";

export default function Setting() {
    async function destroyUserCache() {
        await removeUserStore();
        Toast.show("清除成功");
    }

    return (
        <NativeView style={styles.container}>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

            <NativeView
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    backgroundColor: "transparent",
                }}
            >
                <NativeButton
                    style={{ backgroundColor: "red", width: "90%", borderWidth: 0, paddingVertical: 10 }}
                    textStyle={{ color: "white" }}
                    onPress={destroyUserCache}
                >
                    退出登录
                </NativeButton>
            </NativeView>
        </NativeView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
