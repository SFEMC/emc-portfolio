export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", 'system-ui', 'sans-serif'],
        display: ["'Fraunces'", 'Georgia', 'serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        surface: 'var(--surface)',
        ink: 'var(--text)',
        'ink-soft': 'var(--text-soft)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'btn-bg': 'var(--btn-bg)',
        'btn-text': 'var(--btn-text)',
      },
      maxWidth: {
        'reading': '68ch',
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
}
