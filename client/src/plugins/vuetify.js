/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#2E7D32',
    secondary: '#81C784',
    accent: '#388E3C',
    background: '#E8F5E9',
    surface: '#FFFFFF',
    error: '#E57373',
    'on-primary': '#FFFFFF',
    'on-secondary': '#1B1B1B',
    'on-background': '#1B1B1B',
    'on-surface': '#1B1B1B',
  },
};
const darkTheme = {
  dark: true,
  colors: {
    primary: '#81C784',
    secondary: '#2E7D32',
    accent: '#43A047',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#E57373',
    'on-primary': '#1B1B1B',
    'on-secondary': '#FFFFFF',
    'on-background': '#FFFFFF',
    'on-surface': '#FFFFFF',
  },
};

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
});








