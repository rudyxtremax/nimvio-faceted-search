<template>
  <section>
    <o-field>
      <o-select
        v-model="selectedOptions"
        class="select-filter"
        placeholder="Type"
        expanded
        @change.native="filterOnChange"
      >
        <option value="pdf">PDF</option>
        <option value="xls">Excel</option>
        <option value="jpg">Image</option>
      </o-select>
    </o-field>
  </section>
</template>

<script>
export default {
  computed: {
    selectedOptions: {
      get() {
        return this.$store.state.typeKeyword;
      },
      set(value) {
        this.$store.commit("SET_TYPE_KEYWORD", value);
        this.$store.commit("SET_FORMBODY");
      },
    },
  },
  methods: {
    filterOnChange() {
      this.$store.commit("SET_CURRENTPAGE", 0);
      this.$store.dispatch("postData");
    },
  },
};
</script>

<style lang="scss" scoped>
.select-filter {
  option {
    text-transform: capitalize;
  }
}
</style>
