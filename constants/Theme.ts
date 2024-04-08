import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme'

type ColorType = typeof Colors.light & typeof Colors.dark;
export const Theme = (): ColorType => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light'];
}
