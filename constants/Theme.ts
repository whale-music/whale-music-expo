import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type ColorType = typeof Colors.light & typeof Colors.dark;

export const Theme = (): ColorType => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
};

export const ThemeColor = (colorName: keyof ColorType) => {
    const theme = useColorScheme() ?? 'light';
    return Colors[theme][colorName];
};

/**
 * true:  light
 * false: dark
 * @constructor
 */
export const ThemeMode = (): boolean => {
    const colorScheme = useColorScheme();
    return (colorScheme ?? 'light') === 'light';
};
