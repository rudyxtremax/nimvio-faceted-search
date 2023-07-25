<template>
  <section class="search__input">
    <o-field>
      <o-input v-model="keyword" expanded class="search-box" horizontal placeholder="Search..." type="search"
        size="is-medium" icon="magnify" icon-right="close-circle" icon-right-clickable @icon-right-click="clearKeyword"
        @change="handleChange($event)">
      </o-input>
      <p class="control">
        <o-button class="has-text-white" label="Search" size="is-medium" type="is-info" @click="handleSearch" />
      </p>
    </o-field>
  </section>
</template>

<script>
export default {
  computed: {
    keyword: {
      get() {
        return this.$store.state.keyword;
      },
      set(value) {
        this.$store.commit("SET_KEYWORD", value);
        // this.$store.commit("SET_FORMBODY_FILTER");
        this.$store.commit("SET_FORMBODY");
      },
    },
  },
  methods: {
    handleChange() {
      this.$store.dispatch("postData");
      this.$store.commit("SET_CURRENTPAGE", 0);
    },
    handleSearch() {
      this.$store.dispatch("postData");
      this.$store.commit("SET_CURRENTPAGE", 0);
    },
    clearKeyword() {
      if (this.$store.state.keyword.length) {
        this.$store.commit("SET_KEYWORD", "");
        this.$store.commit("SET_FORMBODY");
        this.$store.commit("SET_CURRENTPAGE", 0);
        this.$store.dispatch("postData");
      }
    },
  },
};
</script>
<style lang="scss">
.search-box {
  width: 100%;
}

.search__input {
  margin: 20px 0;
}
</style>
