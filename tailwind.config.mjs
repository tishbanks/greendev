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
    },
  },
  plugins: [],
}
