import { createRouter, createWebHistory } from 'vue-router';
import ToDevelop from './pages/to-develop.vue';
import ProjectFeatures from './pages/project-features.vue';
import GettingStarted from './pages/getting-started.vue';
import api from './pages/api';
import examples from './pages/examples';
import e2eSuite from '../e2e/suite/';
import Changelog from './pages/changelog.vue';
import Migration from './pages/migration.vue';

const routes = [{
  path: '/',
  name: 'features',
  component: ProjectFeatures,
}, {
  path: '/start',
  name: 'gettingStarted',
  component: GettingStarted,
},
{
  path: '/migration',
  name: 'migration',
  component: Migration,
},
{
  path: '/changelog',
  name: 'changelog',
  component: Changelog,
},
...api,
...examples,
...e2eSuite,
{
  path: '/develop',
  name: 'develop',
  component: ToDevelop,
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
