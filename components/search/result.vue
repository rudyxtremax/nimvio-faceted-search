<template>
  <div class="search-result-container">
    <div v-if="isFetching" class="search-result__loader">
      <common-loader />
    </div>
    <div v-for="(searchItem, index) in searchedData" :key="index">
      <search-card class="result-card" :search-detail="searchItem" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import constant from "../../utils/search-constant";

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    searchData: Array,
  },
  data() {
    return {
      loadingCount: constant.SHOW_ITEMS_PER_PAGE,
    };
  },
  computed: {
    ...mapState(["isFetching", "isFetched", "isError", "searchedData"]),
  },
};
</script>

<style lang="scss">
.search-result-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: "area-1";
  row-gap: 20px;
  margin-bottom: 30px;

  .search-result__loader {
    margin: 0 auto;
    grid-area: "area-1";
  }
}
</style>
