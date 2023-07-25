<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h4>{{ formatDepartment }}</h4>
        <NuxtLink class="card-link" :to="searchDetail.Data.urlPath">
          <h3>{{ searchDetail.Data.contentTitle }}</h3>
        </NuxtLink>
        <div class="card-info">
          <a class="card-file" :href="searchDetail.Data.file.MediaUrl">
            <span style="text-transform: uppercase">
              {{ searchDetail.Data.file.Extension }}
            </span>
          </a>
          &nbsp;
          <span>({{ formatMB }})</span>
        </div>
        <div class="card-date">
          <span>Last Updated: {{ formatCreatedDate }}</span>
          <span>Updated At: {{ formatModifiedDate }}</span>
        </div>
        <p>
          {{ searchDetail.Data.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import helper from "../../utils/search";

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    searchDetail: Object,
  },
  computed: {
    formatModifiedDate() {
      return moment(this.searchDetail.Data.modifiedDate).format("DD MMM YYYY");
    },
    formatCreatedDate() {
      return moment(this.searchDetail.Data.createdDate).format("DD MMM YYYY");
    },
    formatDepartment() {
      return helper.splitStringNumber(this.searchDetail.Data.department);
    },
    formatMB() {
      return helper.convertToMB(this.searchDetail.Data.file.Size);
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  text-transform: capitalize;
}

.card-link:hover,
.card-file:hover {
  text-decoration: underline;
}

.result-card {
  max-width: 100%;
  background: $nimvio-white;
  color: $nimvio-black;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  min-height: auto;
  padding: 1.5rem;
  border-radius: 0.25rem;

  &:hover {
    background: $nimvio-white;
  }

  .card-content {
    font-size: 16px;

    h3,
    h4 {
      font-weight: 600;
      line-height: 1.125;
    }

    h4 {
      font-size: 1.25em;
      margin-bottom: 0.8em;
    }

    h3 {
      font-size: 1.5em;
      margin-bottom: 0.6666em;
    }
  }
}
</style>
