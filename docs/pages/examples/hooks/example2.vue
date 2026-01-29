<template lang="html">
  <section>
    <h2>Example 2</h2>
    <p>
      In the <span class="code">checkTag</span> function, which is called
      by the <span class="code">before-adding-tag</span> hook, some logic is executed.
      If a to adding tag contains the letter "e", an alert box is shown.
    </p>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      @before-adding-tag="checkTag"
    />
    <el-code lang="html" :code="demoHtml" />
    <el-code :code="demoJs" />
  </section>
</template>

<script>
import VueTagsInput from '@wslyhbb/vue3-tags-input';
import ElCode from '@components/el-code.vue';
import demoHtml from './example2.demo.html?raw';
import demoJs from './example2.demo.js?raw';

export default {
  name: 'Example2Hooks',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      handler: null,
      demoHtml,
      demoJs,
    };
  },
  methods: {
    checkTag(obj) {
      if (obj.tag.text.includes('e')) alert('Letter "e" is forbidden');
      else obj.addTag();
    },
  },
};
</script>
