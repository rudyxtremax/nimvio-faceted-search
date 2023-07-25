<template>
  <section>
    <!-- <p>{{ selectDepartment }}</p> -->
    <o-field>
      <o-select
        v-model="selectedOptions"
        class="select-filter"
        placeholder="All Departments"
        expanded
        @change.native="departmentOnChange"
      >
        <option
          v-for="(filter, index) in selectDepartment"
          :key="index"
          :value="filter.key"
        >
          {{ departmentName(filter.key) }}
        </option>
      </o-select>
    </o-field>
  </section>
</template>

<script>
import { mapState } from "vuex";
import helper from "../../utils/search";

export default {
  computed: {
    ...mapState(["selectDepartment"]),
    selectedOptions: {
      get() {
        return this.$store.state.departmentKeyword;
      },
      set(value) {
        this.$store.commit("SET_DEPARTMENT_KEYWORD", value);
        this.$store.commit("SET_FORMBODY");
      },
    },
  },
  mounted() {
    this.$store.dispatch("getDepartmentFilter");
  },
  methods: {
    departmentOnChange() {
      this.$store.commit("SET_CURRENTPAGE", 0);
      this.$store.dispatch("postData");
    },
    departmentName(value) {
      return helper.splitStringNumber(value);
    },
  },
};
</script>

<style lang="scss">
.select-filter {
  select {
    text-transform: capitalize;
  }

  option {
    text-transform: capitalize;
  }
}
</style>
