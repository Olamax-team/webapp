/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'], // Added Poppins font
			DMSans: ['DM Sans', 'sans-serif'],// Added DM Sans font
			Inter: ['Inter', 'sans-serif']// Added DM Sans font
		  },
  		colors: {
				primary: "#039AE4",
				secondary: "#0073AD",
				textDark: "#121826",
				bgSurface: "#FFFFFF",
				bg: "#F8F9FA",
				tagGreen: "#03E41D",
				tagPurple: "#C912B1",
				"darkBg": "#121826",
				"lightBg": "#F8F9FA"
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

