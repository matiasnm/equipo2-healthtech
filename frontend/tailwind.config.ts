/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        secondary: '#E6F0FA',
        accent: '#E1C340',
        base: '#FFFFFF',
        text: {
          DEFAULT: '#1A202C',
          muted: '#4A5568',
          inverted: '#FFFFFF',
        },
        success: '#38A169',
        error: '#E53E3E',
        info: '#3182CE',
        warning: '#DD6B20',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '1rem',
        sm: '0.875rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      screens: {
        xs: '480px',// móviles pequeños
        sm: '640px',// móviles grandes
        md: '768px',// tablets
        lg: '1024px',// laptops
        xl: '1280px',// desktops
        '2xl': '1600px',// pantallas grandes
      },
    },
  },
  plugins: [],
};
