import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import rehypeMathjax from 'rehype-mathjax';
import rehypeMermaid from 'rehype-mermaid';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import starlightLinksValidator from 'starlight-links-validator';
import starlightThemeRapide from 'starlight-theme-rapide';
import externalAnchorPlugin from './src/plugins/externalAnchorPlugin.mjs';

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
        themes: ['github-dark-dimmed', 'github-light'],
        frames: {
          showCopyToClipboardButton: true,
        },
        shiki: {
          langAlias: {
            redis: 'bash',
            vbnet: 'vb',
          },
        },
      },
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
      },
      plugins: [starlightThemeRapide(), starlightLinksValidator()],
      sidebar: [
        {
          label: 'AWS',
          collapsed: true,
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
                  label: 'Last minute notes',
                  link: 'aws/dva/notes',
                },
                {
                  label: 'Caching Strategies',
                  link: 'aws/dva/caching-strategies',
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
              ],
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
                  collapsed: true,
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
              ],
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
              ],
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
                  ],
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
                  ],
                },
                {
                  label: 'Random',
                  collapsed: true,
                  autogenerate: {
                    directory: '/aws/dea/random',
                  },
                },
                {
                  label: 'Resources',
                  collapsed: true,
                  autogenerate: {
                    directory: 'aws/dea/resources',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Generative AI',
          collapsed: true,
          items: [
            {
              label: 'MLOps',
              collapsed: true,
              autogenerate: {
                directory: 'generative-ai/mlops',
              },
            },
            {
              label: 'Courses',
              items: [
                {
                  label: 'LLMOps Specialization',

                  items: [
                    {
                      label: 'Home',
                      link: 'generative-ai/llmops_specialization',
                    },
                    {
                      label: 'Introduction',
                      link: 'generative-ai/llmops_specialization/module1',
                    },
                    {
                      label: 'Module 2',
                      link: 'generative-ai/llmops_specialization/module2',
                    },
                  ],
                },
              ],
            },
          ],
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
              ],
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
              ],
            },
          ],
        },
        {
          label: 'Random',
          collapsed: true,
          items: [
            {
              label: 'Archive',
              autogenerate: {
                directory: 'archive/random',
              },
            },
            {
              label: 'Microsoft',
              autogenerate: {
                directory: 'archive/ms',
              },
            },
            {
              label: 'Snowflake',
              collapsed: true,
              items: [
                {
                  label: 'Overview',
                  link: 'archive/snowflake/overview',
                },
                {
                  label: 'Badges',
                  collapsed: true,
                  items: [
                    {
                      label: '1: Data Warehousing',
                      autogenerate: {
                        directory: 'archive/snowflake/badges/1-data-warehousing-workshop',
                      },
                    },
                  ],
                },
              ],
            },
            {
              label: 'Twelve Factor App',
              autogenerate: {
                directory: 'archive/twelve_factor',
              },
            },
            {
              label: 'CI/CD',
              autogenerate: {
                directory: 'archive/cicd',
              },
            },
          ],
        },
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/marcoantoniogonzalezjunior/',
        github: 'https://github.com/kayaman',
      },
      title: "Marco's Learning",
    }),
  ],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    remarkPlugins: [
      remarkMath,
      [
        remarkToc,
        {
          heading: 'contents',
        },
      ],
      remarkGfm,
      externalAnchorPlugin,
    ],
    rehypePlugins: [rehypeMathjax, rehypeMermaid],
  },
});
