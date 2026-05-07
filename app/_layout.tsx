import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Stack, useSegments, useRouter } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/src/context/AuthContext'

const qc = new QueryClient()

function InitialLayout() {
  const { session, isInitialized } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isInitialized) return

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup'

    if (!session && !inAuthGroup) {
      router.replace('/login')
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)')
    }
  }, [session, isInitialized, segments])

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <Stack />
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={qc}>
        <InitialLayout />
      </QueryClientProvider>
    </AuthProvider>
  )
}
