// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

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
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeMathjax],
	}
});
