<template>
  <div id="search-wrapper" class="container">
    <!-- Search Input -->
    <search-box></search-box>

    <!-- Filters -->
    <div class="search-filter-container">
      <search-select-department />
      <search-select-created-date />
      <search-select-modified-date />
      <search-select-file />
      <search-select-size />
    </div>

    <!-- Reset Filters -->
    <div class="search-filter-container">
      <a class="search-filter__reset" href="#" @click.prevent="handleClear"
        >Reset All</a
      >
    </div>

    <!-- Search Result -->
    <div class="columns">
      <div class="column">
        <div v-if="searchedData.length === 0 && isFetched" class="columns mt-5">
          <div class="column is-full">
            <span class="is-size-5">
              There are no result that match your search. Check that the
              spelling is correct or use different keywords.
            </span>
          </div>
        </div>
        <div v-else>
          <div class="columns">
            <div class="column is-full">
              <search-pagination />
            </div>
          </div>
          <search-result
            :search-data="searchedData !== undefined ? searchedData : []"
          />
          <div class="columns">
            <div class="column is-full">
              <search-pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState([
      "isFetching",
      "isFetched",
      "isError",
      "data",
      "searchedData",
      "selectDepartment",
      "departmentKeyword",
    ]),
  },

  watch: {
    "$route.params": {
      handler() {
        console.log("Test");
      },
      immediate: true,
    },
  },

  mounted() {
    this.$store.dispatch("postData");
  },

  methods: {
    handleClear() {
      this.$store.dispatch("clearAll");
      this.$store.dispatch("postData");
    },
  },
};
</script>

<style lang="scss">
.search-filter-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  grid-template-areas: ". . . . reset";
  column-gap: 15px;

  .search-filter__reset {
    grid-area: reset;
    justify-self: end;
    margin: 20px 0;
  }
}
</style>
