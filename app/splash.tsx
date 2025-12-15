import { useAuth } from '@/hooks/use-auth';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const { isLoading } = useAuth();
  if (!isLoading) {
    SplashScreen.hideAsync();
  }
  return null;
}
