import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LanguageSwitcher } from '@/src/components/i18n/LanguageSwitcher';
import { authImages } from '@/src/features/auth/assets';
import { AuthTextField } from '@/src/features/auth/components/AuthTextField';
import { CampusSelectField } from '@/src/features/auth/components/CampusSelectField';
import { FaceIdLoginButton } from '@/src/features/auth/components/FaceIdLoginButton';
import { LoginBackground } from '@/src/features/auth/components/LoginBackground';
import { LoginCard } from '@/src/features/auth/components/LoginCard';
import { PrimaryButton } from '@/src/features/auth/components/PrimaryButton';
import { RememberMeRow } from '@/src/features/auth/components/RememberMeRow';
import { SocialLoginRow } from '@/src/features/auth/components/SocialLoginRow';
import { useLoginScreen } from '@/src/features/auth/hooks/useLoginScreen';
import { colors } from '@/src/theme/colors';

export function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    toggleRememberMe,
    selectedCampus,
    setSelectedCampus,
    handleLogin,
    handleFaceIdLogin,
    isPending,
    t,
  } = useLoginScreen();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <LoginBackground />

      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.switcherRow}>
          <LanguageSwitcher />
        </View>

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
                <Image
                  accessibilityLabel="FPT Polytechnic"
                  resizeMode="contain"
                  source={authImages.loginLogo}
                  style={styles.logo}
                />
              </View>

              <View style={styles.fields}>
                <CampusSelectField
                  onChange={setSelectedCampus}
                  value={selectedCampus}
                />
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
                <View style={styles.loginRow}>
                  <View style={styles.loginButton}>
                    <PrimaryButton
                      label={t('auth.logIn')}
                      loading={isPending}
                      onPress={handleLogin}
                    />
                  </View>
                  <FaceIdLoginButton
                    accessibilityLabel={t('auth.faceIdLogin')}
                    disabled={isPending}
                    onPress={handleFaceIdLogin}
                  />
                </View>
                <SocialLoginRow />
              </View>
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
  switcherRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
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
    marginBottom: 24,
  },
  fields: {
    gap: 16,
    marginBottom: 24,
    overflow: 'visible',
  },
  actions: {
    gap: 24,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loginButton: {
    flex: 1,
  },
  logo: {
    width: 220,
    height: 72,
  },
});
