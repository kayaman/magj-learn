// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import remarkToc from 'remark-toc';

export default defineConfig({
	site: 'https://learning.magj.dev',
	integrations: [
		starlight({
			title: 'MAGJ Learning',
			social: {
				github: 'https://github.com/kayaman/magj-learning',
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
		remarkPlugins: [remarkMath, [remarkToc, {heading: "contents"}]],
		rehypePlugins: [rehypeMathjax],
	}
});
