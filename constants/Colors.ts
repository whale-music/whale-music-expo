type ThemeColor = {
    // 边框颜色
    border: string;
    // 圆角大小
    radius: string;
    // 背景颜色
    background: string;
    // 次要背景色
    secondaryBackground: string;
    // 前景颜色
    foreground: string;
    // 次要前景颜色
    secondaryForeground: string;
    // 主要颜色
    primary: string;
    // 主要前景颜色
    primaryForeground: string;
    // 强调颜色
    accent: string;
    // 强调前景颜色
    accentForeground: string;
    // 图标颜色
    icon: string;
    // 强调图标颜色
    secondaryIcon: string;
}
// 定义 Colors 对象类型，它允许定义多种主题
// type Colors = {
//     [key: string]: Partial<ThemeColor>;
// }

type Colors = {
    light: Partial<ThemeColor>;
    dark: Partial<ThemeColor>;
}

const Colors: Colors = {
    light: {
        primary: '#6969FF',
        foreground: '#000000',
        background: '#ffffff',
        secondaryBackground: '#f2f2f2',
        icon: '#cccccc',
        secondaryIcon: '#6969FF',
    },
    dark: {
        primary: '#6969FF',
        foreground: '#ffffff',
        background: '#000000',
        secondaryBackground: '#333333',
        icon: '#cccccc',
        secondaryIcon: '#ffffff',
    },
}
export default Colors;
