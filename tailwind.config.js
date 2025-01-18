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
		animation: {
		moveRight: 'moveRight 10s linear infinite',
		moveLeft: 'moveLeft 10s linear infinite',
		},
		keyframes: {
		moveRight: {
			'0%': { transform: 'translateX(0)' },
			'50%': { transform: 'translateX(100px)' },
			'100%': { transform: 'translateX(0)' },
		},
		moveLeft: {
			'0%': { transform: 'translateX(0)' },
			'50%': { transform: 'translateX(-100px)' },
			'100%': { transform: 'translateX(0)' },
		},
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

