<template>
  <section class="search__pagination">
    <div><strong>Page:</strong> {{ currentPage_ }} of {{ totalPage }}</div>
    <o-pagination
      v-model:current="currentPage_"
      class="search__pagination-control"
      :total="totalRecords"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @update:current="pageChange"
    >
      >
    </o-pagination>
  </section>
</template>

<script>
import { mapState } from "vuex";
import constant from "../../utils/search-constant";

export default {
  data() {
    return {
      total: this.totalRecords,
      // current: this.currentPage > 0 ? this.currentPage / 10 - 1 : 1,
      perPage: constant.SHOW_ITEMS_PER_PAGE,
      rangeBefore: 1,
      rangeAfter: 1,
      order: "is-right",
      size: "",
      isSimple: true,
      isRounded: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
    };
  },
  computed: {
    ...mapState([
      "totalRecords",
      "currentPage",
      "isFetched",
      "realPageNum",
      "totalPage",
    ]),
    currentPage_: {
      get() {
        return this.$store.state.realPageNum;
      },
      set(value) {
        this.$store.commit("SET_CURRENTPAGE", value);
      },
    },
  },
  methods: {
    pageChange() {
      // Calculate the page (&start=0)
      // Next Page handled by o-pagination + 1 on next , -1 on previous
      // Starting from 0 because SOLR use 0 as first page

      this.$store.state.currentPage =
        (this.currentPage_ - 1) * constant.SHOW_ITEMS_PER_PAGE;
      this.$store.commit("SET_FORMBODY_FORM");

      // Reload the API after changing the currentPage state
      // Scroll to top after finished
      this.$store.dispatch("postData").then(() => {
        const searchElement = document.querySelector("#search-wrapper");
        searchElement.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
};
</script>

<style lang="scss">
.search__pagination {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;

  .search__pagination-control {
    justify-self: end;
  }
}
</style>
