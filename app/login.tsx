import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { Link } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { palette, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null)

  async function handleLogin() {
    Keyboard.dismiss()
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Bienvenido de nuevo. Ingresa tus datos para continuar.</Text>

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={[styles.input, focusedField === 'email' && styles.inputFocused]}
          placeholder="correo@ejemplo.com"
          placeholderTextColor={palette.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={[styles.input, focusedField === 'password' && styles.inputFocused]}
          placeholder="••••••••"
          placeholderTextColor={palette.textSecondary}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Link href="/signup" style={styles.link}>
          <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: palette.card,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    ...Shadows.medium,
  },
  title: {
    ...Typography.h1,
    color: palette.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.subtitle,
    color: palette.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
    color: palette.text,
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: Typography.body.fontSize,
    color: palette.text,
    backgroundColor: palette.inputBackground,
    marginBottom: Spacing.md,
  },
  inputFocused: {
    borderColor: palette.primary,
    backgroundColor: palette.inputBackgroundFocus,
  },
  button: {
    backgroundColor: palette.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...Typography.button,
    color: '#fff',
  },
  link: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  linkText: {
    ...Typography.subtitle,
    color: palette.textSecondary,
  },
  linkBold: {
    fontWeight: '600',
    color: palette.primary,
  },
})
