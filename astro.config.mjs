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
			sidebar: [
				// {
				// 	label: 'AWS',
				// 	autogenerate: { directory: 'aws' },
				// },
				{
					label: 'AWS',
					items: [
						{ label: 'Overview', link: 'aws/learning' },
						{ label: 'MLA', items: [
								{ label: 'Overview', link: 'aws/mla/overview' },
								{ label: 'Domain 1', autogenerate: { directory: 'aws/mla/plan/domain1' } },
								{ label: 'Domain 2', autogenerate: { directory: 'aws/mla/plan/domain2' } },
								{ label: 'Domain 3', autogenerate: { directory: 'aws/mla/plan/domain3' } },

								{ label: 'Services', autogenerate: { directory: 'aws/mla/services' } },
								{ label: 'Resources', autogenerate: { directory: 'aws/mla/resources' } },
							]
						},
						{ label: 'DEA', items: [
							{ label: 'Overview', link: 'aws/dea/overview' },
							{ label: 'Resources', autogenerate: { directory: 'aws/dea/resources' } },
							] 
						},
						{ label: 'DVA', link: '/aws/dva/overview' },
					]
				}
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
		remarkPlugins: [remarkMath, [remarkToc, {heading: "contents"}]],
		rehypePlugins: [rehypeMathjax],
	}
});
