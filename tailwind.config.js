export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ["'Barlow'", 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        blue: 'var(--blue)',
        'btn-bg': 'var(--btn-bg)',
        'btn-text': 'var(--btn-text)',
      },
    },
  },
  plugins: [],
}
