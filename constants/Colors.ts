type ThemeColor = {
  // 背景颜色
  background: string;
  // 次要背景色
  secondaryBackground: string;
  // 前景颜色
  foreground: string;
  // 次要前景颜色
  secondaryForeground: string;
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
}

const Colors: Colors = {
  light: {
    primary: "#6969FF",
    foreground: "#000000",
    background: "#ffffff",
    secondaryBackground: "#f2f2f2",
    cardForeground: "#cccccc",
    card: "#6969FF",
    border: "#19181b",
  },
  dark: {
    primary: "#6969FF",
    foreground: "#ffffff",
    background: "#000000",
    secondaryBackground: "#333333",
    cardForeground: "#cccccc",
    card: "#ffffff",
    border: "#fafaf7",
  },
};
export default Colors;
