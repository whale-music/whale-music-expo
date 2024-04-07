import { NativeButton, NativeInput, NativeText, NativeView } from '@/components/Themed'
import { useState } from 'react'
import { requestLogin } from '@/api/user'
import Toast from 'react-native-root-toast';
import { router } from 'expo-router'

export default function Login() {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

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
        console.log(r.username, "登录成功")

        Toast.show(`${ r.username }, 登录成功`, toastOptions);
        router.replace('/');
    }

    return (
        <NativeView style={ {flex: 1, justifyContent: "center"} }>
            <NativeView style={ {flexDirection: "column", gap: 10, transform: [ {translateY: -100,}, ]} }>
                <NativeText style={ {fontSize: 70, textAlign: 'center'} }>whale</NativeText>
                <NativeView style={ {marginHorizontal: 10, flexDirection: "column", gap: 20} }>
                    <NativeInput placeholder="请输入账户" keyboardType="email-address" value={ username } onChangeText={ setUsername }/>
                    <NativeInput placeholder="请输入密码" secureTextEntry={ true } value={ password } onChangeText={ setPassword }/>
                </NativeView>
                <NativeButton style={ {backgroundColor: 'white'} } textStyle={ {color: 'black'} } onPress={ login }> 登录 </NativeButton>
            </NativeView>
        </NativeView>
    )
}
