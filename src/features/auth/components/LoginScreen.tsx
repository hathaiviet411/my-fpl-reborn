import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthSvgIcon } from '@/src/components/ui/AuthSvgIcon';
import { authIcons } from '@/src/features/auth/assets';
import { AuthTextField } from '@/src/features/auth/components/AuthTextField';
import { LoginBackground } from '@/src/features/auth/components/LoginBackground';
import { LoginCard } from '@/src/features/auth/components/LoginCard';
import { PrimaryButton } from '@/src/features/auth/components/PrimaryButton';
import { RememberMeRow } from '@/src/features/auth/components/RememberMeRow';
import { SignUpFooter } from '@/src/features/auth/components/SignUpFooter';
import { SocialLoginRow } from '@/src/features/auth/components/SocialLoginRow';
import { useLoginScreen } from '@/src/features/auth/hooks/useLoginScreen';
import { colors } from '@/src/theme/colors';

const LogoShield = authIcons.logoShield;

export function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    toggleRememberMe,
    handleLogin,
    isPending,
  } = useLoginScreen();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <LoginBackground />

      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <LoginCard>
              <View style={styles.header}>
                <AuthSvgIcon
                  Icon={LogoShield}
                  fallback={
                    <Ionicons color="#4D81E7" name="shield" size={34} />
                  }
                  height={34}
                  width={34}
                />
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>
                  Enter your email and password to log in
                </Text>
              </View>

              <View style={styles.fields}>
                <AuthTextField
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                />
                <AuthTextField
                  isPassword
                  autoComplete="password"
                  onChangeText={setPassword}
                  value={password}
                />
                <RememberMeRow
                  checked={rememberMe}
                  onToggle={toggleRememberMe}
                />
              </View>

              <View style={styles.actions}>
                <PrimaryButton
                  label="Log In"
                  loading={isPending}
                  onPress={handleLogin}
                />
                <SocialLoginRow />
              </View>

              <SignUpFooter />
            </LoginCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundTop,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.headline,
    letterSpacing: -0.64,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.grey,
    textAlign: 'center',
  },
  fields: {
    gap: 16,
    marginBottom: 24,
  },
  actions: {
    gap: 24,
    marginBottom: 24,
  },
});
