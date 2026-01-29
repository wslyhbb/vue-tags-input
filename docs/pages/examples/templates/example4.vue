<template lang="html">
  <section>
    <h2>Slot: autocomplete-header & autocomplete-footer</h2>
    <vue-tags-input
      v-model="tag"
      placeholder="Type something"
      :tags="tags"
      :allow-edit-tags="true"
      :add-only-from-autocomplete="true"
      :autocomplete-items="bikeMakers"
      class="tags-input"
      @tags-changed="newTags => tags = newTags"
    >
      <template #autocomplete-header>
        <strong>Select your favorite bike maker ↓</strong>
      </template>
      <template #autocomplete-footer>
        <small>
          <em>Or keep going with your worlds...</em>
        </small>
      </template>
    </vue-tags-input>
    <el-code :code="demoHtml" lang="html" />
    <el-code :code="demoJs" />
  </section>
</template>

<script>
import ElCode from '@components/el-code.vue';
import VueTagsInput from '@wslyhbb/vue3-tags-input';
import demoHtml from './example4.demo.html?raw';
import demoJs from './example4.demo.js?raw';

export default {
  name: 'Example4TemplateComponent',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      bikeMakers: [{
        text: 'Honda',
      }, {
        text: 'Yamaha',
      }, {
        text: 'Suzuki',
      }, {
        text: 'Triumph',
      }, {
        text: 'Kawasaki',
      }, {
        text: 'Triumph',
      }, {
        text: 'husqvarna',
      }],
      demoHtml,
      demoJs,
    };
  },
};
</script>
