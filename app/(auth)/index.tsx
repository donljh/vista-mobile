import { supabase } from '@/lib/supabase';
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AuthIndex() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Vista</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.buttonContainer}>
        <GoogleSignInButton />
      </View>

      <Text style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f1f1f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    gap: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 12,
  },
  googleButtonPressed: {
    backgroundColor: '#f8f9fa',
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f1f1f',
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  terms: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
  },
});
function GoogleSignInButton() {
  GoogleSignin.configure({
    webClientId:
      '933023079924-ebc3bsokhrsunmnrmu7nja28l9d6elra.apps.googleusercontent.com',
    iosClientId:
      '933023079924-qvv0918s0veive05g4vlk8j5ba23ukf8.apps.googleusercontent.com',
  });
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const response = await GoogleSignin.signIn();
          if (isSuccessResponse(response)) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.data.idToken!,
            });
            console.log(error, data);
          }
        } catch (error: any) {
          console.error('Google Sign-In error:', error);
          if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  );
}
