import { Platform } from 'react-native'

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F9FAFB',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}

export const palette = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#11181C',
  textSecondary: '#687076',
  border: '#D0D5DD',
  inputBackground: '#F9FAFB',
  inputBackgroundFocus: '#FFFFFF',
  error: '#EF4444',
  success: '#22C55E',
}

export const Typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  caption: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
  subtitle: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
}

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 99,
}

export const Shadows = {
  card: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      default: {
        elevation: 4,
      },
    }),
  },
  medium: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      default: {
        elevation: 6,
      },
    }),
  },
}

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})
