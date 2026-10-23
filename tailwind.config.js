/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B1020', // Main background
          900: '#0F172A', // Secondary background
          850: '#121A2B', // Card background
          800: '#182338', // Elevated card
          700: '#293548', // Borders
        },
        brand: {
          indigo: '#6366F1',
          cyan: '#22D3EE',
          blue: '#60A5FA',
          green: '#34D399',
          red: '#F87171',
        },
        textPrimary: '#F1F5F9',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-indigo': '0 0 20px -5px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 20px -5px rgba(34, 211, 238, 0.3)',
        'glow-blue': '0 0 20px -5px rgba(96, 165, 250, 0.3)',
      }
    },
  },
  plugins: [],
}
