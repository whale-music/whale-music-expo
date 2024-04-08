type ThemeColor = {
    // 边框颜色
    border: string;
    // 圆角大小
    radius: string;
    // 背景颜色
    background: string;
    // 前景颜色
    foreground: string;
    // 主要颜色
    primary: string;
    // 主要前景颜色
    primaryForeground: string;
    // 强调颜色
    accent: string;
    // 强调前景颜色
    accentForeground: string;
    // 次要颜色
    secondary: string;
    // 次要前景颜色
    secondaryForeground: string;
}
export default {
    light: {
        foreground: '#000000',
        background: '#ffffff',
        secondaryBackground: '#f2f2f2',
        tabIconDefault: '#cccccc',
        tabIconSelected: '#6969FF',
    },
    dark: {
        foreground: '#ffffff',
        background: '#000000',
        secondaryBackground: '#333333',
        tabIconDefault: '#cccccc',
        tabIconSelected: '#ffffff',
    },
};
