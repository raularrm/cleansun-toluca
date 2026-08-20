/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      borderRadius: { DEFAULT: '9999px', control: 'var(--radius-control)' },
      boxShadow: { hairline: '0 0 0 1px var(--border)' },
      colors: {
        bg: 'var(--bg)',
        background: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        inset: 'var(--inset)',
        ink: { DEFAULT: 'var(--text-primary)', 2: 'var(--text-secondary)', 3: 'var(--ink-3)' },
        muted: 'var(--text-secondary)',
        line: { DEFAULT: 'var(--border)', strong: 'var(--line-strong)' },
        hover: { DEFAULT: 'var(--hover)', 2: 'var(--hover-2)' },
        accent: 'var(--accent)',
        accentStrong: 'var(--accent-strong)',
        accentOn: 'var(--accent-text-on)',
        accent2: 'var(--accent-2)',
      },
    },
  },
  plugins: [],
}
