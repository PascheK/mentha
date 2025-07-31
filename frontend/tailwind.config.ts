import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", 
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-0.5rem)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'fade-out': 'fade-out 0.2s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'scale-out': 'scale-out 0.2s ease-out forwards',
        'slide-down': 'slide-down 0.2s ease-out forwards',
        'slide-up': 'slide-up 0.2s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.3s ease-out forwards',
        'slide-out-left': 'slide-out-left 0.3s ease-out forwards',
      },
        zIndex: {
    '-50': '-50',
    '-10': '-10',
  },
    },
  },
  plugins: [],
};
export default config;
