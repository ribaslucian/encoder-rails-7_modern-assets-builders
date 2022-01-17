module.exports = {
  content: ["./app/views/**/*.{html,erb,css,scss,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
