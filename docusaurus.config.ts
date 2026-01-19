import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AURA Blockchain',
  tagline: 'Decentralized Credential Verification',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.aurablockchain.org',
  baseUrl: '/',

  organizationName: 'aura-blockchain',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/aura-blockchain/docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/aura-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AURA',
      logo: {
        alt: 'AURA Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Testnet',
          position: 'left',
          items: [
            {label: 'Explorer', href: 'https://explorer.aurablockchain.org'},
            {label: 'Faucet', href: 'https://testnet-faucet.aurablockchain.org'},
            {label: 'Artifacts', href: 'https://artifacts.aurablockchain.org'},
          ],
        },
        {
          href: 'https://github.com/aura-blockchain',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/RwQ8pma6',
          label: 'Discord',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/getting-started/overview'},
            {label: 'MVP Testnet', to: '/mvp/about'},
            {label: 'API Reference', to: '/api/rest'},
          ],
        },
        {
          title: 'Network',
          items: [
            {label: 'Explorer', href: 'https://explorer.aurablockchain.org'},
            {label: 'Faucet', href: 'https://testnet-faucet.aurablockchain.org'},
            {label: 'Artifacts', href: 'https://artifacts.aurablockchain.org'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Discord', href: 'https://discord.gg/RwQ8pma6'},
            {label: 'Twitter', href: 'https://twitter.com/useyouraura'},
            {label: 'GitHub', href: 'https://github.com/aura-blockchain'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AURA Blockchain | Chain ID: aura-mvp-1`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'toml', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
