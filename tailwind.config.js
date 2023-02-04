// Tailwind Config File
// -------------------
// "The theme section is where you define your color palette, font stacks, type
// scale, border sizes, breakpoints — anything related to the visual design of
// your site."

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: "",
      body: "",
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'ocean-green': '#26C485',
      'copper-red': '#D66853',
      'space-cadet': '#2D3047',
      'dark-space-cadet': '#1E202E',
      'light-french-beige': '#C4A77D',
      'shadow-blue': '#778DA9',
      'veridian': '#48A9A6',
      'baby-powder': '#FDFFFC',
    },
  },
};
