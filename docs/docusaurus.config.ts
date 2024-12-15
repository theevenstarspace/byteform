import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { themes as prismThemes } from 'prism-react-renderer';
import { copyFile, throwIfNoContent } from './scripts/copy';
import type { Config, Plugin, PluginConfig } from '@docusaurus/types';
import type { TypeDocOptions } from 'typedoc';
import type { PluginOptions } from 'typedoc-plugin-markdown';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

type DocsOptions = TypeDocOptions & PluginOptions;
const typeDocsOptions: Partial<DocsOptions> = {
  entryPoints: ['../src/index.ts'],
  tsconfig: '../tsconfig.json',
  plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-markdown'],
  skipErrorChecking: true,
  // disableSources: true,

  name: 'API Reference',
  includeVersion: true,

  readme: 'none',

  sort: ['source-order'],
  groupOrder: ['Streams', 'Types', 'Available Types', 'Helpers', 'Other'],

  expandParameters: true,

  // indexFormat: 'htmlTable',
  parametersFormat: 'htmlTable',
  interfacePropertiesFormat: 'htmlTable',
  classPropertiesFormat: 'htmlTable',
  typeDeclarationFormat: 'htmlTable',
  propertyMembersFormat: 'htmlTable',

  tableColumnSettings: {
    hideDefaults: true,
    hideInherited: false,
    hideModifiers: false,
    hideOverrides: false,
    hideSources: false,
    hideValues: false,
    leftAlignHeaders: true
  }
};

const config: Config = {
  title: 'Byteform',
  tagline: 'Encode and decode binary data with ease.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://byteform.netlify.app',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenAnchors: 'ignore',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    (): Plugin => ({
      name: 'copy-assets-plugin',
      loadContent(): void {
        copyFile('../README.md', 'docs/README.md');

        throwIfNoContent('../benchmark/results');
        copyFile('../benchmark/results', 'benchmarks');
      },
    }),
    [
      require.resolve("docusaurus-plugin-search-local"),
      {
        indexBlog: false
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      typeDocsOptions,
    ] as unknown as PluginConfig
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',

          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/theevenstarspace/byteform/tree/main/docs/',

          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-RBTRB885ZK',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Byteform',
      logo: {
        alt: 'Byteform Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        // { type: 'docsVersionDropdown', position: 'right' },
        {
          href: 'https://github.com/theevenstarspace/byteform',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
