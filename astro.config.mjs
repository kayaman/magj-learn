// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'MAGJ Learning',
			social: {
				github: 'https://github.com/kayaman/learning',
			},
			sidebar: [
				{
					label: 'AWS',
					autogenerate: { directory: 'aws' },
				},
			],
		}),
	],
});
