import { NativeButton, NativeInput, NativeText, NativeView } from '@/components/Themed'
import { useState } from 'react'
import { requestLogin } from '@/api/user'


export default function Login() {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const login = async () => {
        const r = await requestLogin(username, password)
        console.log(r.username, "登录成功")
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
