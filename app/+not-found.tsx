import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { NativeText, NativeView } from '@/components/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <NativeView style={styles.container}>
        <NativeText style={styles.title}>This screen doesn't exist.</NativeText>

        <Link href="/" style={styles.link}>
          <NativeText style={styles.linkText}>Go to home screen!</NativeText>
        </Link>
      </NativeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
