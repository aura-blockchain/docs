import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/installation',
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'MVP Testnet',
      items: [
        'mvp/about',
        'mvp/modules',
        'mvp/cli-reference',
        'mvp/endpoints',
      ],
    },
    {
      type: 'category',
      label: 'Node Operations',
      items: [
        'operations/validator-setup',
        'operations/node-operator',
        'operations/upgrades',
        'operations/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'sdk/overview',
        'sdk/typescript',
        'sdk/react',
        'sdk/react-native',
        'sdk/flutter',
        'sdk/cli',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/rest',
        'api/grpc',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/policy',
        'security/key-ceremony',
        'security/incident-response',
      ],
    },
    'public-endpoints',
  ],
};

export default sidebars;
