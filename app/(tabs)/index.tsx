import { Image, ScrollView, StyleSheet } from "react-native";
import { NativeButton, NativeText, NativeView } from "@/components/Themed";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { getUserInfo, UserInfoRes } from "@/api/user";

export default function TabOneScreen() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState<UserInfoRes>();

  useEffect(() => {
    (async function () {
      const r = await getUserInfo();
      setUserInfo(r);
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: userInfo?.username !== undefined ? userInfo.username : "User", // 使用 title 属性来设置顶栏标题
    });
  }, [userInfo?.username]);

  if (!userInfo && userInfo === undefined) {
    return (
      <>
        <NativeView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NativeButton
            style={{ backgroundColor: "white" }}
            textStyle={{ color: "black" }}
            onPress={() => router.replace("/login")}
          >
            {" "}
            登录{" "}
          </NativeButton>
        </NativeView>
      </>
    );
  }
  return (
    <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
      <NativeView style={styles.container}>
        <NativeView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 10,
            backgroundColor: "transparent",
          }}
        >
          <Image
            source={{ uri: userInfo?.avatarUrl }}
            style={{ width: 100, height: 100 }}
            borderRadius={9999}
            width={100}
            height={100}
          />
          <NativeText style={{ fontSize: 30, fontWeight: "bold" }}>
            {userInfo?.username}, 早上好
          </NativeText>
        </NativeView>
      </NativeView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: 'transparent'
    },
});
