/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-100': '#FFFFFF',
        'neutral-200': '#F8FAFF',
        'neutral-300': '#F1F3F7',
        'neutral-400': '#E1E4ED',
        'neutral-600': '#6D758F',
        'brand-blue': '#4262FF',
        'brand-blue-light': '#03C7FD',
        'brand-indigo': '#5871ED',
        'dark-navy': '#0B1225',
        'dark-bg': '#1C193F',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'pretendard': ['Pretendard', '"Noto Sans KR"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0px 4px 8px 0px rgba(0,0,0,0.15)',
        'drop': '0px 4px 8px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
