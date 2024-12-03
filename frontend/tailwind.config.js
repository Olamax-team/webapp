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
  		colors: {
				primary: "#039AE4",
				secondary: "#0073AD",
				"darkBg": "#121826",
				"lightBg": "#F8F9FA"
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

