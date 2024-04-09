import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Theme } from "@/constants/Theme";
import { NativeText, NativeView } from "@/components/Themed";
import { Image } from "react-native";

export default function VideoPreviewActionsSheet(
  props: SheetProps<"audio-preview">,
) {
  const theme = Theme();

  const resource = props.payload?.value;
  const bgStyle = { backgroundColor: theme.secondary };

  function AudioPreview() {
    if (resource && resource.url !== null && resource.url.trim().length > 0) {
      return (
        <>
          <NativeText style={{ marginBottom: 10 }}>{resource.name}</NativeText>
          <Image
            style={{ height: "80%", aspectRatio: 1 }}
            defaultSource={require("@/assets/images/placeholder.png")}
            source={{
              uri: resource.url,
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <NativeView
            style={[
              { flex: 1, justifyContent: "center", alignItems: "center" },
              bgStyle,
            ]}
          >
            <NativeText style={{ fontSize: 20 }}>请重新选择数据</NativeText>
          </NativeView>
        </>
      );
    }
  }

  return (
    <>
      <ActionSheet
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: theme.secondary,
        }}
        indicatorStyle={{
          width: 100,
          opacity: 0.6,
          backgroundColor: theme.foreground,
        }}
        gestureEnabled={true}
      >
        <NativeView style={{ height: 200, backgroundColor: theme.secondary }}>
          <NativeView
            style={[
              {
                paddingTop: 20,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
              bgStyle,
            ]}
          >
            <AudioPreview />
          </NativeView>
        </NativeView>
      </ActionSheet>
    </>
  );
}
