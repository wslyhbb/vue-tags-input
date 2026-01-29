import Validation from './validation.vue';
import Autocomplete from './autocomplete.vue';
import Hooks from './hooks.vue';
import EditTag from './edit-tag.vue';
import AddSaveOnKey from './add-save-on-key.vue';

export default [{
  path: '/e2e-suite/validation.vue',
  component: Validation,
}, {
  path: '/e2e-suite/autocomplete.vue',
  component: Autocomplete,
}, {
  path: '/e2e-suite/hooks.vue',
  component: Hooks,
}, {
  path: '/e2e-suite/edit-tag.vue',
  component: EditTag,
}, {
  path: '/e2e-suite/add-save-on-key.vue',
  component: AddSaveOnKey,
}];
