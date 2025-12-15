import Splash from '@/app/splash';
import { useAuth } from '@/hooks/use-auth';
import AuthProvider from '@/providers/auth-provider';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Splash />
      <RootNavigator />
      <StatusBar style='auto' />
    </AuthProvider>
  );
}
