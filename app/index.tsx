import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or return a loading component
  }

  if (isLoggedIn) {
    return <Redirect href='/(tabs)' />;
  }

  return <Redirect href='/(auth)' />;
}
