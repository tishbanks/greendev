// tailwind.config.mjs

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // ✅ active le dark mode via une classe 'dark'
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      flex: {
        '0.8': '0.8 1 0%',
        '2': '2 1 0%',
      },
    },
  },
  plugins: [],
}
