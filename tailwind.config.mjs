/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./public/**/*.{html,js,css,svg}'
	],
    theme: {
        extend: {},
    },
    plugins: [
        require("@catppuccin/tailwindcss")({
          prefix: "ctp",
        //   defaultFlavour: "mocha",
        }),
      ],
}