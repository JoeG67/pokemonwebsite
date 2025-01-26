// tailwind.config.js

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ['"Pokemon Solid"', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
};
