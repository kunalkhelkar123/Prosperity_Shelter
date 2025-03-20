// tailwind.config.js
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 4s linear infinite", // Custom slow spin
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
