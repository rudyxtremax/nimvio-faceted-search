<template>
  <section>
    <o-field>
      <o-select
        v-model="selectedOptions"
        class="select-filter"
        placeholder="Size"
        expanded
        @change.native="sizeOnChange"
      >
        <option value="0">&#60; 1 MB</option>
        <option value="1">1-5 MB</option>
        <option value="2">&#62; 5MB</option>
      </o-select>
    </o-field>
  </section>
</template>

<script>
export default {
  computed: {
    selectedOptions: {
      get() {
        return this.$store.state.sizeKeyword;
      },
      set(value) {
        this.$store.commit("SET_SIZE_KEYWORD", value);
        this.$store.commit("SET_FORMBODY");
      },
    },
  },
  methods: {
    sizeOnChange() {
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
