import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '2b0'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'c61'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'fad'),
            routes: [
              {
                path: '/api/grpc',
                component: ComponentCreator('/api/grpc', 'b72'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/api/rest',
                component: ComponentCreator('/api/rest', 'a48'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/getting-started/installation',
                component: ComponentCreator('/getting-started/installation', '91c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/getting-started/overview',
                component: ComponentCreator('/getting-started/overview', 'c5a'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/getting-started/quickstart',
                component: ComponentCreator('/getting-started/quickstart', 'e41'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/mvp/about',
                component: ComponentCreator('/mvp/about', 'd33'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/mvp/cli-reference',
                component: ComponentCreator('/mvp/cli-reference', '2cd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/mvp/endpoints',
                component: ComponentCreator('/mvp/endpoints', '6fa'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/mvp/modules',
                component: ComponentCreator('/mvp/modules', '439'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/operations/node-operator',
                component: ComponentCreator('/operations/node-operator', 'b7f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/operations/troubleshooting',
                component: ComponentCreator('/operations/troubleshooting', 'fa1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/operations/upgrades',
                component: ComponentCreator('/operations/upgrades', '042'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/operations/validator-setup',
                component: ComponentCreator('/operations/validator-setup', '71c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/public-endpoints',
                component: ComponentCreator('/public-endpoints', 'af1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/security/incident-response',
                component: ComponentCreator('/security/incident-response', 'f09'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/security/key-ceremony',
                component: ComponentCreator('/security/key-ceremony', 'c70'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/security/policy',
                component: ComponentCreator('/security/policy', '3ec'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '682'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
