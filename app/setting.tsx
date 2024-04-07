import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { NativeInput, NativeText, NativeView } from '@/components/Themed';
import { useEffect, useState } from 'react'
import { getServerUrlSettingStoreData, saveServerUrlSettingStoreData } from '@/store/setting'

export default function ModalScreen() {
    const [ serverUrl, setServerUrl ] = useState("")

    useEffect(() => {
        getServerUrlSettingStoreData().then(v => {
            if (v) {
                setServerUrl(v);
            }
        })
    }, []);

    async function handleServerUrl(val: string) {
        setServerUrl(val);
        await saveServerUrlSettingStoreData(val)
    }

    return (
        <NativeView style={ styles.container }>
            <NativeView>
                <NativeText style={ {fontSize: 30} }>服务地址</NativeText>
                <NativeInput
                    style={ {height: 40, borderWidth: 1} }
                    onChangeText={ handleServerUrl }
                    defaultValue={ serverUrl }
                    placeholder='请输入服务地址'
                />
                {/*<TextInput variant="outline" size="md" isDisabled={ false } isInvalid={ false } isReadOnly={ false }>*/ }
                {/*    <InputField defaultValue={ serverUrl } onChangeText={ handleServerUrl } color={ colorScheme === 'dark' ? "$textLight0" : "$textDark950" } placeholder='请输入服务地址'/>*/ }
                {/*</TextInput>*/ }
            </NativeView>
            {/* Use a light status bar on iOS to account for the black space above the modal */ }
            <StatusBar style={ Platform.OS === 'ios' ? 'light' : 'auto' }/>
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
