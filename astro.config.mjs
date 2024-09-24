// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import remarkToc from 'remark-toc';
import starlightThemeRapide from 'starlight-theme-rapide'
import { astroExpressiveCode } from '@astrojs/starlight/expressive-code';
import starlightLinksValidator from 'starlight-links-validator';
import mediaDirective from 'astro/runtime/client/media.js';

export default defineConfig({
	site: 'https://learning.magj.dev',
	integrations: [
		astroExpressiveCode({
			themes: ['dracula', 'github-light'],
			frames: {
				showCopyToClipboardButton: true,
			},
			shiki: true,
			tabWidth: 4,
			defaultProps: {
				wrap: true,
				overridesByLang: {
				  'json': { preserveIndent: true },
				},
			},
		}),
		starlight({
			favicon: '/favicon.png',
			logo: {
				src: './src/assets/logo.png'
			},
			title: 'MAGJ Learning',
			plugins: [starlightThemeRapide(), starlightLinksValidator()],
			sidebar: [
				{
					label: 'AWS',
					items: [
						{ 
							label: 'Overview', 
							link: 'aws/learning' 
						},
						{ 
							label: 'Machine Learning Engineer',
							collapsed: true,
							items: [
								{ 
									label: 'Overview', 
									link: 'aws/mla/overview' },
								{ 
									label: 'Domain 1', 
									collapsed: true,
									autogenerate: { directory: 'aws/mla/plan/domain1' } 
								},
								{ 
									label: 'Domain 2', 
									collapsed: true,
									autogenerate: { directory: 'aws/mla/plan/domain2' } 
								},
								{ 
									label: 'Domain 3', 
									collapsed: true,
									autogenerate: { directory: 'aws/mla/plan/domain3' } 
								},
								{ 
									label: 'Domain 4', 
									collapsed: true,
									autogenerate: { directory: 'aws/mla/plan/domain4' } 
								},
								{ 
									label: 'Services', 
									collapsed: true,
									autogenerate: { directory: 'aws/mla/services' } 
								},
								{ 
									label: 'Resources', 
									collapsed: true,
									autogenerate: { directory: 'aws/mla/resources' } 
								},
							]
						},
						{ 
							label: 'Data Engineer', 
							collapsed: true,
						  	items: [
								{ 
									label: 'Overview', 
									link: 'aws/dea/overview' },
								{ 
									label: 'Resources', 
									autogenerate: { directory: 'aws/dea/resources' } 
								},
							] 
						},
						{ 
							label: 'Developer',
							collapsed: true,
							items: [
								{
									label: 'Overview',
									link: 'aws/dva/overview' 
								},
							]
						},
					]
				},
				{
					label: 'Microsoft',
					collapsed: true,
					items: [
						{ 
							label: 'Overview', 
							link: 'ms/learning' 
						},
						{ 
							label: 'AI Engineer',
							collapsed: true,
							items: [ 
								{ label: 'Overview', link: 'ms/ai-engineer/overview' } 
							]
						},
					]
				},
				{
					label: 'Snowflake',
					collapsed: true,
					items: [
						{ 
							label: 'Overview', 
							link: 'snowflake/overview' 
						},
						{ 
							label: 'Badges', 
							collapsed: true,
							items: [ 
								{ label: '1: Data Warehousing', autogenerate: { directory: 'snowflake/badges/1-data-warehousing-workshop' } } 
							]
						},
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
