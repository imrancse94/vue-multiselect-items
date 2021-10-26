<script>
import Vue from 'vue';
import VueMultiselectItems from '@/vue-multiselect-items.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueMultiselectItems
  }
});
</script>

<template>
  <div id="app">
    <vue-multiselect-items />
  </div>
</template>
