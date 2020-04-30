<template>
  <div class="vue__easy__pager">
    <div class="control__page" @click="decrement()">
      &#8249;
    </div>
    <div class="page__item__container" v-for="pagination in paginationsDisplayed" :key="pagination">
      <div
      :class="{
        'page__item': true,
        'active': pagination == page
      }"
      @click="setPage(pagination)"
      >
        {{ pagination }}
      </div>
    </div>
    <div class="control__page" @click="increment()">
      &#8250;
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueEasyPager',
  props: {
    /**
     * Current page number
     * @default 1
     * @type {Number}
     */
    currentPage: {
      type: Number,
      default: 1
    },
    /**
     * Total number of pages
     * @default 1
     * @type {Number}
     */
    totalPages: {
      type: Number,
      default: 1
    },
    /**
     * Maximum number of pages displayed
     * @default 6
     * @type {Number}
     */
    maxPagesDisplayeds: {
      type: Number,
      default: 6
    },
  },
  data() {
    return {
      page: this.currentPage,
      direction: 1,
    };
  },
  methods: {
    decrement() {
      if (this.page > 1) this.page--;
    },
    increment() {
      if (this.page < this.totalPages) this.page++;
    },
    setPage(page) {
      this.page = page;
    },
  },
  computed: {
    paginationsDisplayed() {
      if (this.totalPages <= this.maxPagesDisplayeds) {
        return this.totalPages;
      } else {
        let to = this.page + Math.ceil(this.maxPagesDisplayeds / 2) - this.direction;
        if (to <= this.maxPagesDisplayeds) {
          to = this.maxPagesDisplayeds;
        } else if (to > this.totalPages) {
          to = this.totalPages;
        }
        let from = to - this.maxPagesDisplayeds + 1;
        return Array(to - from + 1).fill().map((item, index) => from + index);
      }
    }
  },
  watch: {
    page (to, from) {
      this.direction = to > from ? 1 : 0;
      this.$emit('changePage', to);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  font-family: Arial, Helvetica, sans-serif;
}
.vue__easy__pager {
  height: 40px;
}
.vue__easy__pager,
.control__page,
.page__item {
  display: flex;
  align-items: center;
}
.control__page,
.page__item {
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  cursor: pointer;
}
.control__page {
  height: 20px;
  min-width: 20px;
  border-radius: 20px;
  padding-bottom: 3px;
  background: #EFEFEF;
  color: #666666;
  font-size: 1.5rem;
  transition: all .2s;
}
.control__page:hover {
  background: #DFDFDF;
  color: #333333;
}
.control__page:first-child {
  margin-right: 5px;
}
.control__page:last-child {
  margin-left: 5px;
}
.page__item {
  height: 30px;
  min-width: 30px;
  margin: 0 2px;
  border-radius: 4px;
  transition: all .2s ease-in-out;
  color: #444444;
}
.page__item:hover {
  background: #EFEFEF;
}
.page__item.active {
  background: #328af1;
  box-shadow: rgb(215, 232, 253) 0px 4px 10px 1px;
  color: #FFF;
  height: 32px;
}
</style>