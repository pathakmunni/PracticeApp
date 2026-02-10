// colors.ts

const Colors = {
  // 🎨 Primary Theme
  primary: '#4A6CF7', // Main blue
  secondary: '#FF4B55', // Red - alerts or logout
  accent: '#FFD54F', // Optional yellow accent

  // 🧱 Background & Surfaces
  background: '#F6F7FB',
  surface: '#FFFFFF',

  // 🖋 Text Colors
  textPrimary: '#333333',
  textSecondary: '#555555',
  textMuted: '#777777',
  textWhite: '#FFFFFF',

  // 🧭 Borders & Shadows
  border: '#DDDDDD',
  shadow: '#000000',

  // ✅ Status Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // ⚪ Neutral Shades
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#E0E0E0',
  gray: '#9E9E9E',
  grayDark: '#424242',

  // 🍔 Food / Dashboard Specific
  bannerBlue: '#4A6CF7',
  badgeRed: '#FF4B55',
  categoryGray: '#555555',

  // 💬 Transparent Layers
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
} as const;

export default Colors;


// colors.ts

const ColorsLight = {
  // 🎨 Primary Theme
  primary: '#4A6CF7', // Main blue
  secondary: '#FF4B55', // Red - alerts or logout
  accent: '#FFD54F', // Optional yellow accent

  // 🧱 Background & Surfaces
  background: '#F6F7FB',
  surface: '#FFFFFF',

  // 🖋 Text Colors
  textPrimary: '#333333',
  textSecondary: '#555555',
  textMuted: '#777777',
  textWhite: '#FFFFFF',

  // 🧭 Borders & Shadows
  border: '#DDDDDD',
  shadow: '#000000',

  // ✅ Status Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // ⚪ Neutral Shades
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#E0E0E0',
  gray: '#9E9E9E',
  grayDark: '#424242',

  // 🍔 Food / Dashboard Specific
  bannerBlue: '#4A6CF7',
  badgeRed: '#FF4B55',
  categoryGray: '#555555',

  // 💬 Transparent Layers
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
} as const;

const ColorsDark = {
  // 🎨 Primary Theme
  primary: '#6E8CFF', // Slightly lighter blue for dark mode
  secondary: '#FF6B6B',
  accent: '#FFE082',

  // 🧱 Background & Surfaces
  background: '#121212',
  surface: '#1E1E1E',

  // 🖋 Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#999999',
  textWhite: '#FFFFFF',

  // 🧭 Borders & Shadows
  border: '#333333',
  shadow: '#000000',

  // ✅ Status Colors
  success: '#81C784',
  warning: '#FFD54F',
  error: '#E57373',
  info: '#64B5F6',

  // ⚪ Neutral Shades
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#2C2C2C',
  gray: '#555555',
  grayDark: '#999999',

  // 🍔 Food / Dashboard Specific
  bannerBlue: '#6E8CFF',
  badgeRed: '#FF6B6B',
  categoryGray: '#BBBBBB',

  // 💬 Transparent Layers
  overlay: 'rgba(0, 0, 0, 0.6)',
  transparent: 'transparent',
} as const;

export { ColorsLight, ColorsDark };

// Default export for convenience
// export default ColorsLight;
