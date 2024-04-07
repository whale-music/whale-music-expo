import { NativeButton, NativeInput, NativeText, NativeView } from '@/components/Themed'
import { useEffect, useState } from 'react'
import { requestLogin } from '@/api/user'
import Toast from 'react-native-root-toast';
import { router } from 'expo-router'
import { getServerUrlSettingStoreData, saveServerUrlSettingStoreData } from '@/store/setting'
import { StyleSheet } from 'react-native'

export default function Login() {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ serverUrl, setServerUrl ] = useState("")

    useEffect(() => {
        getServerUrlSettingStoreData(false).then(v => {
            if (v) {
                setServerUrl(v);
            }
        })
    }, []);

    async function handleServerUrl(val: string) {
        setServerUrl(val);
        await saveServerUrlSettingStoreData(val)
    }

    const toastOptions = {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    }
    const login = async () => {
        if (!username && username.trim().length <= 0 && !password && password.trim().length <= 0) {
            Toast.show("请输入账户", toastOptions)
            return
        }
        const r = await requestLogin(username, password)
        console.debug(r.username, "登录成功")

        Toast.show(`${ r.username }, 登录成功`, toastOptions);
        router.replace('/');
    }

    return (
        <NativeView style={ {flex: 1, justifyContent: "center"} }>
            <NativeView style={ {flexDirection: "column", gap: 10, transform: [ {translateY: -70,}, ]} }>
                <NativeText style={ {fontSize: 70, textAlign: 'center'} }>whale</NativeText>
                <NativeView style={ {marginHorizontal: 10, flexDirection: "column", gap: 20} }>
                    <NativeInput
                        style={ [ styles.input ] }
                        onChangeText={ handleServerUrl }
                        defaultValue={ serverUrl }
                        placeholder='请输入服务地址'
                    />
                    <NativeInput style={ styles.input } placeholder="请输入账户" keyboardType="email-address" value={ username } onChangeText={ setUsername }/>
                    <NativeInput style={ styles.input } placeholder="请输入密码" secureTextEntry={ true } value={ password } onChangeText={ setPassword }/>
                </NativeView>
                <NativeButton style={ {backgroundColor: 'white'} } textStyle={ {color: 'black'} } onPress={ login }> 登录 </NativeButton>
            </NativeView>
        </NativeView>
    )
}


const styles = StyleSheet.create({
    input: {
        padding: 15,
    },
});
