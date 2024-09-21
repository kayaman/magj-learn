// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

export default defineConfig({
	site: 'https://learning.magj.dev',
	integrations: [
		starlight({
			title: 'MAGJ Learning',
			sidebar: [
				{
					label: 'AWS',
					autogenerate: { directory: 'aws' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/kayaman/magj-learning/edit/main/',
			},
			social: {
				github: 'https://github.com/kayaman',
				linkedin: 'https://www.linkedin.com/in/marcoantoniogonzalezjunior/',
			}
		}),
	],
	markdown: {
		remarkPlugins: [remarkMath, remarkToc],
		rehypePlugins: [rehypeMathjax, rehypeAccessibleEmojis],
	}
});
