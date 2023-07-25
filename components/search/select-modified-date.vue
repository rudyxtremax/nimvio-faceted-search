<template>
  <o-field>
    <o-datepicker
      v-model="selectedModifiedDate"
      :focused-date="date"
      :first-day-of-week="1"
      :nearby-selectable-month-days="true"
      placeholder="Modified Date"
      @update:modelValue="clickModifiedDate"
    >
      <o-field>
        <p>selected: {{ selected }}</p>
      </o-field>
    </o-datepicker>
  </o-field>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: String,
  },
  data() {
    return {
      // fromDate: new Date(),
      // toDate: new Date(),
      showWeekNumber: false,
      locale: undefined, // Browser locale
      date: new Date(),
      month: null,
      year: null,
      months: [
        { name: "January", value: 0 },
        { name: "February", value: 1 },
        { name: "March", value: 2 },
        { name: "April", value: 3 },
        { name: "May", value: 4 },
        { name: "June", value: 5 },
        { name: "July", value: 6 },
        { name: "August", value: 7 },
        { name: "September", value: 8 },
        { name: "October", value: 9 },
        { name: "November", value: 10 },
        { name: "December", value: 11 },
      ],
      selected: "",
    };
  },
  computed: {
    selectedModifiedDate: {
      get() {
        return this.$store.state.modifiedDate;
      },
      set(value) {
        this.$store.commit("SET_MODIFIED_DATE", value);
        this.$store.commit("SET_FORMBODY", value);
      },
    },
  },
  mounted() {
    this.month = this.months.filter(
      (item) => item.value === this.date.getMonth()
    )[0].name;
  },
  methods: {
    // selectMonth(option) {
    //     if (option) {
    //         this.date = new Date(this.date)
    //         this.date.setMonth(option.value)
    //     }
    // },
    clickModifiedDate(selDate) {
      if (selDate) {
        this.date = new Date(selDate);
        this.selected =
          this.months[this.date.getMonth()].name +
          " " +
          this.date.getDate() +
          ", " +
          this.date.getFullYear();
        this.$store.commit("SET_CURRENTPAGE", 0);
        this.$store.dispatch("postData");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  // margin-bottom: 20px;
  box-shadow: none;
}
</style>
