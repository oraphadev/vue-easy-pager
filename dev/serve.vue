<script>
import Vue from 'vue';
import VueEasyPager from '@/vue-easy-pager.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueEasyPager
  },
});
</script>

<template>
  <div id="app">
    <vue-easy-pager />
  </div>
</template>
