export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ["'Barlow'", 'sans-serif'],
      },
      colors: {
        bg: '#111111',
        surface: '#1a1a1a',
        ink: '#f0f0f0',
        muted: '#888888',
        border: '#2a2a2a',
        blue: '#4f8ef7',
      },
    },
  },
  plugins: [],
}
