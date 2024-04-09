type ThemeColor = {
    // 背景颜色
    background: string;
    // 前景颜色
    foreground: string;
    // 卡片背景颜色
    card: string;
    // 卡片前景颜色
    cardForeground: string;
    // 弹出框背景颜色
    popover: string;
    // 弹出框前景颜色
    popoverForeground: string;
    // 主要颜色
    primary: string;
    // 主要前景颜色
    primaryForeground: string;
    // 次要颜色
    secondary: string;
    // 次要前景颜色
    secondaryForeground: string;
    // 淡化颜色
    muted: string;
    // 淡化前景颜色
    mutedForeground: string;
    // 强调颜色
    accent: string;
    // 强调前景颜色
    accentForeground: string;
    // 毁坏颜色
    destructive: string;
    // 毁坏前景颜色
    destructiveForeground: string;
    // 边框颜色
    border: string;
    // 输入框颜色
    input: string;
    // 环形颜色
    ring: string;
    // 半径
    radius: string;
};
// 定义 Colors 对象类型，它允许定义多种主题
type Colors = {
    [key: string]: Partial<ThemeColor>;
};

const Colors: Colors = {
    light: {
        background: '#ffffff',
        foreground: '#d5d5d5',
        card: '#ffffff',
        cardForeground: '#d5d5d5',
        popover: '#ffffff',
        popoverForeground: '#d5d5d5',
        primary: '#161616',
        primaryForeground: '#f3f3f3',
        secondary: '#f2f2f2',
        secondaryForeground: '#161616',
        muted: '#f2f2f2',
        mutedForeground: '#848484',
        accent: '#f2f2f2',
        accentForeground: '#161616',
        destructive: '#994e4e',
        destructiveForeground: '#f3f3f3',
        border: '#e6e6e6',
        input: '#e6e6e6',
        ring: '#161616',
        radius: '0.5rem',
    },
    dark: {
        background: '#0f0f0f',
        foreground: '#f3f3f3',
        card: '#0f0f0f',
        cardForeground: '#f3f3f3',
        popover: '#0f0f0f',
        popoverForeground: '#f3f3f3',
        primary: '#f3f3f3',
        primaryForeground: '#161616',
        secondary: '#3c3c3c',
        secondaryForeground: '#f3f3f3',
        muted: '#3c3c3c',
        mutedForeground: '#a5a5a5',
        accent: '#3c3c3c',
        accentForeground: '#f3f3f3',
        destructive: '#402828',
        destructiveForeground: '#f3f3f3',
        border: '#3c3c3c',
        input: '#3c3c3c',
        ring: '#343434',
        radius: '0.5rem', // 半径
    },
};
export default Colors;
