import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../redux/store';
import {login} from '../redux/authSlice';
import {loginValidationSchema} from '../validation/loginSchema';
import {Button} from '../../../components/Button';
import {Input} from '../../../components/Input';
import {Colors} from '../../../config/colors';
import {Spacing} from '../../../config/dimensions';

interface LoginFormData {
  employeeId: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error} = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isConnected] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      employeeId: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap();
    } catch (err: any) {
      const errorMessage = err?.message || 'Invalid Employee ID or Password';
      setError('employeeId', {
        type: 'server',
        message: errorMessage,
      });
      setError('password', {
        type: 'server',
        message: errorMessage,
      });
    }
  };

  const displayError = errors.employeeId?.message || errors.password?.message;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerSection}>
            <View style={styles.logoCard}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoIcon}>🏭</Text>
              </View>
            </View>
            <Text style={styles.appTitle}>Smart Factory Gate</Text>
            <Text style={styles.appSubtitle}>Management System</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>
                Login to continue gate operations
              </Text>
            </View>

            {displayError && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{displayError}</Text>
              </View>
            )}

            <Controller
              control={control}
              name="employeeId"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="EMPLOYEE ID"
                  placeholder="Enter Employee ID"
                  value={value}
                  onChangeText={text => onChange(text.toUpperCase())}
                  onBlur={onBlur}
                  error={errors.employeeId?.message}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  keyboardType="default"
                  containerStyle={styles.inputContainer}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="PASSWORD / PIN"
                  placeholder="Enter Password or PIN"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={
                    Platform.OS === 'ios' ? 'default' : 'visible-password'
                  }
                  containerStyle={styles.inputContainer}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}>
                      <Text style={styles.eyeText}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </TouchableOpacity>
                  }
                />
              )}
            />

            <Button
              title="LOGIN NOW"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              fullWidth
              size="large"
              style={styles.loginButton}
            />
          </View>

          <View style={styles.footerSection}>
            <View
              style={[
                styles.statusCard,
                isConnected ? styles.statusOnline : styles.statusOffline,
              ]}>
              <View
                style={[
                  styles.statusDot,
                  isConnected
                    ? styles.statusDotOnline
                    : styles.statusDotOffline,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  isConnected
                    ? styles.statusTextOnline
                    : styles.statusTextOffline,
                ]}>
                {isConnected
                  ? 'Connected to Factory Network'
                  : 'No Internet Connection'}
              </Text>
            </View>

            <Text style={styles.securityNote}>
              🔒 Factory Security Access Only
            </Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  logoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 36,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  errorIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
  inputContainer: {
    marginBottom: 16,
  },
  eyeButton: {
    padding: 4,
  },
  eyeText: {
    fontSize: 20,
  },
  loginButton: {
    marginTop: 8,
  },
  footerSection: {
    alignItems: 'center',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusOnline: {
    backgroundColor: '#ECFDF5',
  },
  statusOffline: {
    backgroundColor: '#FEF2F2',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusDotOnline: {
    backgroundColor: Colors.statusOnline,
  },
  statusDotOffline: {
    backgroundColor: Colors.statusOffline,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: '#065F46',
  },
  statusTextOffline: {
    color: Colors.error,
  },
  securityNote: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textDisabled,
    fontWeight: '500',
  },
});