// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import externalAnchorPlugin from './src/plugins/externalAnchorPlugin.mjs';	
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
  site: 'https://learn.magj.dev',
  integrations: [
    starlight({
      favicon: '/favicon.png',
      components: {
        SocialIcons: './src/components/CustomSocialIcons.astro',
			},
      customCss: [
				'./src/styles/globals.css',
				'@fontsource/open-sans/400.css',
				'@fontsource/open-sans/600.css',
			],
      editLink: {
        baseUrl: 'https://github.com/kayaman/magj-learn/edit/main/',
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
      },
      logo: {
        light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
			},
      plugins: [
				starlightThemeRapide(),
        starlightLinksValidator(),
      ],
      sidebar: [
				{
					label: 'AWS',
					items: [
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
            { 
							label: 'Solutions Architect',
							collapsed: true,
							items: [
								{
									label: 'Overview',
									link: 'aws/sa/overview',
								},
								{
									label: 'Domains',
									autogenerate: {
										directory: 'aws/sa/domains',
									},
								},
								{ 
									label: 'Courses', 
									collapsed: true,
									autogenerate: {
										directory: 'aws/sa/courses',
									},
								},								
								{ 
									label: 'Resources', 
									link: 'aws/sa/resources',
								},
							]
						},
						{ 
							label: 'ML Engineer',
							collapsed: true,
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
							collapsed: true,
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
									collapsed: true,
									items: [
										{
											label: 'Overview',
											link: 'aws/dea/course/overview',
										},
										{ 
											label: 'Fundamentals',
											link: 'aws/dea/course/fundamentals',
										},
										{ 
											label: 'Storage',
											collapsed: true,
											autogenerate: { 
												directory: 'aws/dea/course/storage',
											},
										},
										{ 
											label: 'Database',
											collapsed: true,
											autogenerate: { 
												directory: 'aws/dea/course/database',
											},
										},
										{ 
											label: 'Migration & Transfer',
											collapsed: true,
											autogenerate: { 
												directory: 'aws/dea/course/migration-transfer',
											},
										},
										{ 
											label: 'Application Integration',
											collapsed: true,
											autogenerate: { 
												directory: 'aws/dea/course/aoolication-integration',
											},
										},
									]
								},
								{ 
									label: 'Practice Exams',
									collapsed: true,
									items: [
										{ 
											label: 'Sample Questions',
											link: '/aws/dea/practice/questions',
										},
										{ 
											label: 'Exam 1',
											link: '/aws/dea/practice/exam-1',
										},
									]
								},
								{ 
									label: 'Resources', 
									collapsed: true,
									autogenerate: { 
										directory: 'aws/dea/resources',
									},
								},
							] 
						},
          ],
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
								{
									label: 'LFS158x',
									collapsed: true,
									autogenerate: { 
										directory: 'kubernetes/LFS158x',
									},
								},
							]
				},
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/marcoantoniogonzalezjunior/',
				github: 'https://github.com/kayaman',
			},
      title: 'Marco\'s Learning',
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