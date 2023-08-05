/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-syne)'],
      },
      minHeight: {
        screenHeightWithoutHeader: 'calc(100vh - 96px)'
      },
      height: {
        screenHeightWithoutHeader: 'calc(100vh - 96px)'
      },
      colors: {
        transparent: "transparent",
        white: "#fff",
        "off-white": "#f7f8f8",
        "transparent-white": "rgba(255, 255, 255, 0.08)",
        background: "#000212",
        // background: "#306B34",
        grey: "#858699",
        "grey-dark": "#222326",
        "primary-text": "#b4bcd0",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
