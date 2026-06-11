/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./components/**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F4EFE8',
        'bone-2': '#EAE3D8',
        paper: '#FBF8F3',
        clay: '#C9A687',
        'clay-2': '#B08A66',
        terracotta: '#B5583E',
        espresso: '#2A221C',
        ink: '#1A1511',
        stone: '#6E6358',
        'stone-2': '#8F847A',
        line: '#D9D0C2',
        'line-2': '#C6BAA8',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
