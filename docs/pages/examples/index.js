import Styling from './styling/index.vue';
import Autocomplete from './autocomplete/index.vue';
import Validation from './validation/index.vue';
import Hooks from './hooks/index.vue';
import Templates from './templates/index.vue';
import Nuxt from './nuxt.vue';

export default [{
  path: '/examples/styling',
  name: 'examples.styling',
  component: Styling,
}, {
  path: '/examples/autocomplete',
  name: 'examples.autocomplete',
  component: Autocomplete,
}, {
  path: '/examples/validation',
  name: 'examples.validation',
  component: Validation,
}, {
  path: '/examples/hooks',
  name: 'examples.hooks',
  component: Hooks,
}, {
  path: '/examples/templates',
  name: 'examples.templates',
  component: Templates,
}, {
  path: '/examples/nuxt',
  name: 'examples.nuxt',
  component: Nuxt,
}];
