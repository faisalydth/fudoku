module.exports = {
	content: ["./public/**/*{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: {
					base: "hsl(142, 72%, 29%)",
					dark: "hsl(158, 95%, 23%)",
					light: "hsl(142, 72%, 90%)",
				},
				secondary: {
					base: "hsl(193, 56%, 17%)",
					dark: "hsl(193, 56%, 9%)",
				},
				accent: {
					base: "hsl(251, 9%, 65%)",
					dark: "hsl(251, 2%, 24%)",
					light: "hsl(251, 5%, 94%)",
				},
			},
		},
	},
	plugins: [],
};
