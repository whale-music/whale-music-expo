import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { NativeButton, NativeText, NativeView } from '@/components/Themed';
import { useEffect, useState } from 'react'
import { getServerUrlSettingStoreData } from '@/store/setting'
import { removeUserStore } from '@/store/user'
import Toast from 'react-native-root-toast'

export default function ModalScreen() {
    const [ serverUrl, setServerUrl ] = useState("")

    useEffect(() => {
        getServerUrlSettingStoreData(false).then(v => {
            if (v) {
                setServerUrl(v);
            }
        })
    }, []);

    async function destroyUserCache() {
        await removeUserStore()
        Toast.show("清除成功")
    }

    return (
        <NativeView style={ styles.container }>
            {/* Use a light status bar on iOS to account for the black space above the modal */ }
            <StatusBar style={ Platform.OS === 'ios' ? 'light' : 'auto' }/>

            <NativeView style={ {flexDirection: 'row', justifyContent: "space-between", alignItems: "center", padding: 5} }>
                <NativeText style={ {marginLeft: 10, fontSize: 20} }>清除缓存</NativeText>
                <NativeButton style={ {backgroundColor: 'red', borderWidth: 0, margin: 0} } textStyle={ {color: 'white'} } onPress={ destroyUserCache }>清除</NativeButton>
            </NativeView>
        </NativeView>
    );
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    }
});
