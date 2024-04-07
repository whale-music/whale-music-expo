import { NativeText, TextProps } from './Themed';

export function MonoText(props: TextProps) {
    return <NativeText { ...props } style={ [ props.style, {fontFamily: 'SpaceMono'} ] }/>;
}
