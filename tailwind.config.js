export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", 'system-ui', 'sans-serif'],
        display: ["'Inter'", 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        surface: 'var(--surface)',
        navy: 'var(--navy)',
        'navy-deep': 'var(--navy-deep)',
        ink: 'var(--text)',
        'ink-soft': 'var(--text-soft)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-light': 'var(--accent-light)',
      },
      maxWidth: {
        'reading': '68ch',
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
}
