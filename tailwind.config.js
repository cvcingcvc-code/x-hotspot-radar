/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scarf: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F8CFD8',
          300: '#F1A9BC',
          400: '#E47596',
          500: '#C06C84', // 少女同款豆沙绯红
          600: '#A8526B',
          700: '#8C3D53',
          800: '#753547',
          900: '#64313F',
        },
        frost: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#090D16',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
      boxShadow: {
        'frost': '0 8px 32px 0 rgba(192, 108, 132, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'frost-glow': '0 0 25px rgba(226, 140, 159, 0.25)',
        'glass-hover': '0 12px 40px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
