module.exports = {
  // content: [], <-- not working
  // content: ['./pages/**/*.{js,ts,jsx,tsx}'], <-- not working
  content: [
    "apps/frontend/pages/**/*.{js,ts,jsx,tsx}",
    "libs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
