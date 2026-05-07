import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, palette, Typography, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo de Carros',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    backgroundColor: palette.card,
    ...Shadows.medium,
  },
  header: {
    backgroundColor: palette.card,
  },
  headerTitle: {
    ...Typography.h2,
    color: palette.text,
  },
});
