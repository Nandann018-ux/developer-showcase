/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Love Ya Like A Sister"', 'cursive'],
        display: ['"Love Ya Like A Sister"', 'cursive'],
        hand: ['"Love Ya Like A Sister"', 'cursive'],
        marker: ['"Love Ya Like A Sister"', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        ink: '#000000',
        paper: '#000000',
        board: '#000000',
        chalk: '#f3f1e7',
        coral: '#e8897a',
        glass: 'rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.12)' },
          '66%': { transform: 'translate(-30px,20px) scale(0.92)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        spin360: {
          to: { transform: 'rotate(360deg)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.4)' },
        },
        lightningFlash: {
          '0%,100%': { opacity: '0' },
          '0%,3%,7%': { opacity: '0' },
          '1%': { opacity: '0.9' },
          '2%': { opacity: '0.25' },
          '4%': { opacity: '0.75' },
          '5%': { opacity: '0.1' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
        gradientShift: 'gradientShift 8s ease infinite',
        spin360: 'spin360 6s linear infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        twinkle: 'twinkle 5s ease-in-out infinite',
        lightningFlash: 'lightningFlash 9s ease-out infinite',
      },
    },
  },
  plugins: [],
}
