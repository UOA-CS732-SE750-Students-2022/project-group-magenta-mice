module.exports = {
  // content: [], <-- not working
  // content: ['./pages/**/*.{js,ts,jsx,tsx}'], <-- not working
  content: [
    "apps/frontend/**/*.{js,ts,jsx,tsx}",
    "libs/components/**/*.{js,ts,jsx,tsx}",
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
