/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { StyleProp, StyleSheet, Text as DefaultText, TextInput, TextStyle, TouchableOpacity, View as DefaultView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { ReactNode } from 'react'

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & TextInput['props'];
export type TouchableOpacityProps = ThemeProps & TouchableOpacity['props'];

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function NativeText(props: TextProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <DefaultText style={ [ {color}, style ] } { ...otherProps } />;
}

export function NativeView(props: ViewProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

    return <DefaultView style={ [ {backgroundColor}, style ] } { ...otherProps } />;
}

export function NativeInput(props: TextInputProps) {
    const {style, lightColor, darkColor, placeholderTextColor, ...otherProps} = props;

    const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    const theme = useColorScheme() ?? 'light';
    const rgba = theme === 'light' ? 'rgb(241, 242, 242)' : 'rgba(20, 20, 20, 0.8)';
    return (
        <TextInput
            { ...props }
            placeholderTextColor="gray"
            style={ [
                {
                    fontSize: 16,
                    color: textColor,
                    backgroundColor: rgba,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: "transparent"
                },
                style
            ] }
        />
    )
}


export function NativeButton({icon, textStyle, children, ...props}: { icon?: ReactNode, textStyle?: StyleProp<TextStyle>, children: ReactNode } & TouchableOpacityProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;

    const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return (
        <TouchableOpacity
            { ...props }
            style={ [ {borderWidth: 1}, styles.button, style ] }
        >
            { icon }
            <NativeText style={ [ styles.buttonText, {color: textColor}, textStyle ] } numberOfLines={ 1 } ellipsizeMode='tail'>
                { children }
            </NativeText>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        margin: 16,
        padding: 11,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 32,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold"
    },
})
