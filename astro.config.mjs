// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import externalAnchorPlugin from './src/plugins/externalAnchorPlugin.mjs';	
import starlightThemeRapide from 'starlight-theme-rapide'
import { astroExpressiveCode } from '@astrojs/starlight/expressive-code';
import starlightLinksValidator from 'starlight-links-validator';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://learn.magj.dev',
	integrations: [
		sitemap({}),
		starlight({
			favicon: '/favicon.png',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
			},
			title: 'Marco\'s Learning',
			plugins: [
				starlightThemeRapide(), 
				starlightLinksValidator(),
			],
			customCss: [
				'./src/styles/globals.css',
				'@fontsource/open-sans/400.css',
				'@fontsource/open-sans/600.css',
			],
			components: {
				SocialIcons: './src/components/CustomSocialIcons.astro',
			},
			sidebar: [
				{
					label: 'AWS',
					items: [
						{ 
							label: 'Overview', 
							link: 'aws/learning',
						},
						{ 
							label: 'ML Engineer',
							collapsed: true,
							badge: {
								text: 'done',
								variant: 'success',
							},
							items: [
								{ 
									label: 'Overview', 
									link: 'aws/mla/overview',
								},
								{ 
									label: 'Domain 1', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/mla/plan/domain1',
									},
								},
								{ 
									label: 'Domain 2', 
									collapsed: true,
									autogenerate: {
										directory: 'aws/mla/plan/domain2',
									},
								},
								{ 
									label: 'Domain 3', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/mla/plan/domain3',
									},
								},
								{ 
									label: 'Domain 4', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/mla/plan/domain4',
									},
								},
								{ 
									label: 'Services', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/mla/services',
									},
								},
								{ 
									label: 'Resources', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/mla/resources',
									},
								},
							]
						},
						{ 
							label: 'Data Engineer', 
							collapsed: false,
							badge: {
								text: 'current',
								variant: 'tip'
							},
							items: [
								{
									label: 'Overview',
									link: 'aws/dea/overview',
								},
								{ 
									label: 'Plan',
									collapsed: true,
									autogenerate: { 
										directory: 'aws/dea/plan',
									},
								},
								{ 
									label: 'Course',
									items: [
										{
											label: 'Overview',
											link: 'aws/dea/course/overview',
										},
										{ 
											label: 'Fundamentals',
											autogenerate: { 
												directory: 'aws/dea/course/section1',
											},
										},
										{ 
											label: 'Storage',
											autogenerate: { 
												directory: 'aws/dea/course/section2',
											},
										},
										{ 
											label: 'Database',
											autogenerate: { 
												directory: 'aws/dea/course/section3',
											},
										},
										{ 
											label: 'Migration & Transfer',
											autogenerate: { 
												directory: 'aws/dea/course/section4',
											},
										},
										{ 
											label: 'Application Integration',
											autogenerate: { 
												directory: 'aws/dea/course/section8',
											},
										},
									]
								},
								{ 
									label: 'Resources', 
									autogenerate: { 
										directory: 'aws/dea/resources',
									},
								},
							] 
						},
						{ 
							label: 'Developer',
							collapsed: true,
							items: [
								{
									label: 'Overview',
									link: 'aws/dva/overview',
								},
								{ 
									label: 'Resources', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/dva/resources',
									},
								},
								{ 
									label: 'Recommended', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/dva/recommended',
									},
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
							link: 'ms/learning',
						},
						{ 
							label: 'AI Engineer',
							collapsed: true,
							items: [ 
								{ 
									label: 'Overview', 
									link: 'ms/ai-engineer/overview',
								},
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
							link: 'snowflake/overview',
						},
						{ 
							label: 'Badges', 
							collapsed: true,
							items: [ 
								{ 
									label: '1: Data Warehousing', 
									autogenerate: { 
										directory: 'snowflake/badges/1-data-warehousing-workshop',
									},
								},
							]
						},
					],
				},
				{
					label: 'Neo4j',
					collapsed: true,
					items: [
						{
							label: 'Overview',
							link: 'neo4j/overview',
						},
						{
							label: 'Fundamentals',
							collapsed: true,
							items: [
								{
									label: 'Neo4j Fundamentals',
									autogenerate: { 
										directory: 'neo4j/fundamentals/neo4j-fundamentals',
									},
								},
								{
									label: 'Cypher Fundamentals',
									autogenerate: { 
										directory: 'neo4j/fundamentals/cypher-fundamentals',
									},
								},
							]
						},
						{
							label: 'Generative AI',
							collapsed: true,
							items: [
								{ 
									label: 'Neo4j & LLM Fundamentals',
									autogenerate: { 
										directory: 'neo4j/generative-ai/llm-fundamentals',
									},
								},
							]
						},
					]
				},
				{
					label: 'Kubernetes',
					collapsed: true,
					items: [
								{
									label: 'Basics',
									collapsed: true,
									autogenerate: { 
										directory: 'kubernetes/basics',
									},
								},
								{
									label: 'Minikube',
									collapsed: true,
									autogenerate: { 
										directory: 'kubernetes/minikube',
									},
								},
							]
				}
			],
			editLink: {
				baseUrl: 'https://github.com/kayaman/magj-learn/edit/main/',
			},
			social: {
				linkedin: 'https://www.linkedin.com/in/marcoantoniogonzalezjunior/',
				github: 'https://github.com/kayaman',
			},
			expressiveCode: {
				themes: [
					'github-dark-dimmed', 
					'github-light',
				],
				frames: {
					showCopyToClipboardButton: true,
				},
				shiki: true,
				tabWidth: 4,
				defaultProps: {
					wrap: false,
					overridesByLang: {
						'json': { 
							preserveIndent: true,
						},
					},
				},
			},
		}),
	],
	markdown: {
		remarkPlugins: [
			remarkMath, 
			[
				remarkToc, {
					heading: "contents"
				}
			],
			remarkGfm, 
			externalAnchorPlugin
		],
		rehypePlugins: [
			rehypeMathjax
		],
	}
});
