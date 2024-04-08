import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { NativeText, NativeView } from '@/components/Themed'
import { Theme } from '@/constants/Theme'
import AudioPlay from '@/components/AudioPlay'

export default function AudioPreviewActionsSheet(props: SheetProps<"audio-preview">) {
    const theme = Theme()

    const resource = props.payload?.value
    const bgStyle = {backgroundColor: theme.secondaryBackground};

    function AudioPreview() {
        if (resource && resource.url !== null && resource.url.trim().length > 0) {
            return (
                <>
                    <AudioPlay resource={ resource } url={ resource.url } style={ bgStyle }/>
                </>
            )
        } else {
            return (
                <>
                    <NativeView style={ [ {flex: 1, justifyContent: 'center', alignItems: 'center',}, bgStyle ] }>
                        <NativeText style={ {fontSize: 20} }>请重新选择数据</NativeText>
                    </NativeView>
                </>
            )
        }
    }

    return (
        <>
            <ActionSheet
                containerStyle={ {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    backgroundColor: theme.secondaryBackground
                } }
                indicatorStyle={ {
                    width: 100,
                    opacity: 0.6,
                    backgroundColor: theme.text
                } }
                gestureEnabled={ true }
            >
                <NativeView style={ {height: 200, backgroundColor: theme.secondaryBackground} }>
                    <NativeView style={ [ {paddingTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, bgStyle ] }>
                        <AudioPreview/>
                    </NativeView>
                </NativeView>
            </ActionSheet>
        </>
    )
}