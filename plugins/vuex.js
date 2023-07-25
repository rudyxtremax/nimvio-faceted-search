import { createStore } from "vuex";
import axios from "axios";
import constant from "../utils/search-constant";
import helper from "../utils/search";

// to handle state
const state = {
  // Dynamic Filter to state
  filter_list: constant.FILTER_LIST,
  data: {},
  searchedData: [],
  totalPage: 1,
  totalRecords: 0,
  currentPage: 0,
  realPageNum: 1,
  isFetching: false,
  isFetched: false,
  isError: false,
  keyword: "",
  currentSearchQuery: "",
  selectDepartment: "",
  departmentKeyword: null,
  createdDate: null,
  modifiedDate: null,
  typeKeyword: null,
  sizeKeyword: null,
  formBody: {
    from: 0,
    size: constant.ROW_PER_PAGE,
    query: {
      bool: {
        must: [constant.MATCH_PHRASE],
      },
    },
  },
  departmentBody: {
    aggs: {
      "my-agg-name": {
        terms: {
          field: "Data.department.keyword",
        },
      },
    },
  },
  // school_journey: [],
  // content_type: [],
  // news_category: [],
  // filters: {
  //   school_journey_ss: "",
  //   content_type_s: "",
  //   news_category_s: "",
  // },
};

// Dynamic filter based on config

// constant.FILTER_LIST.map((val, index) => {
//   if (index === 0) {
//     Object.assign(state, { filters: {} });
//   }

//   Object.assign(state, { [val.name]: [] });

//   Object.assign(state.filters, {
//     [val.name + val.solrSuffix]: val.type === "checkbox" ? [] : "",
//   });
// });

// to handle state
const getters = {};

// to handle actions
const actions = {
  // async getData({ commit }) {
  //   // const currentSearchQuery = `${state.searchQuery}`;

  //   let filters = "";

  //   constant.FILTER_LIST.map((val) => {
  //     if (state.filters[val.name + val.solrSuffix].length) {
  //       if (state.filters[val.name + val.solrSuffix] instanceof Array) {
  //         filters += helper.fqBuilder(
  //           val.name + val.solrSuffix,
  //           helper.fqGroupValue(state.filters[val.name + val.solrSuffix])
  //         );
  //       } else {
  //         filters += helper.fqBuilder(
  //           val.name + val.solrSuffix,
  //           `"${state.filters[val.name + val.solrSuffix]}"`
  //         );
  //       }
  //     }
  //   });

  //   // Keyword
  //   let keywordQuery = "q=*";

  //   if (state.keyword !== "") {
  //     keywordQuery = `q=${state.keyword}`;
  //   }

  //   commit(
  //     "SET_SEARCH_QUERY",
  //     `${keywordQuery}${filters}&rows=${constant.SHOW_ITEMS_PER_PAGE}&start=${state.currentPage}`
  //   );

  //   return await new Promise((resolve) => {
  //     commit("SET_LOADING", "fetching");
  //     commit("SET_SEARCHED_DATA", []);

  //     return axios
  //       .get(
  //         `${constant.API_URL}${constant.SEARCH_URL}/select?${keywordQuery}${filters}&rows=${constant.SHOW_ITEMS_PER_PAGE}&start=${state.currentPage}&json.facet={content_type:{type:terms,field:content_type_s,limit:-1,sort:index},school_journey:{type:terms,field:school_journey_ss,limit:-1,sort:index},news_category:{type:terms,field:news_category_s,limit:-1,sort:index}}`
  //       )
  //       .then((response) => {
  //         const { numFound } = response.data.response;

  //         if (numFound > 0) {
  //           commit("SET_DATA", response.data);
  //           commit("SET_SEARCHED_DATA", response.data.response.docs);
  //           commit("SET_PAGINATION", response.data.response.numFound);

  //           // SET FILTER
  //           constant.FILTER_LIST.map((val) => {
  //             commit("SET_INITIAL_FILTER", {
  //               name: val.name,
  //               value: response.data.facets[val.name].buckets,
  //             });
  //           });
  //         }
  //         commit("SET_LOADING", "fetched");

  //         if (state.keyword.length) {
  //           helper.insertParam("q", state.keyword);
  //         }

  //         if (state.currentPage.length) {
  //           helper.insertParam("start", state.currentPage);
  //         }

  //         resolve();
  //       })
  //       .catch((err) => {
  //         commit("SET_LOADING", "error");
  //         console.log(err);
  //       });
  //   });
  // },

  async postData({ commit }) {
    return await new Promise((resolve) => {
      commit("SET_LOADING", "fetching");
      commit("SET_SEARCHED_DATA", []);

      return axios
        .post(`${constant.API_URL}${constant.PROJECT_ID}`, state.formBody)
        .then((response) => {
          const { totalItems } = response.data;

          if (totalItems > 0) {
            commit("SET_DATA", response.data);
            commit("SET_SEARCHED_DATA", response.data.data);
            commit("SET_PAGINATION", response.data.totalItems);
          }

          commit("SET_LOADING", "fetched");

          if (state.currentPage.length) {
            helper.insertParam("start", state.currentPage);
          }

          resolve();
        })
        .catch((err) => {
          commit("SET_LOADING", "error");
          console.log(err);
        });
    });
  },

  async getDepartmentFilter({ commit }) {
    return await new Promise((resolve) => {
      return axios
        .post(`${constant.API_URL}${constant.PROJECT_ID}`, state.departmentBody)
        .then((response) => {
          const dataDepartment =
            response.data.aggregations["my-agg-name"].buckets;

          if (dataDepartment.length) {
            // state.selectDepartment = dataDepartment;
            commit("SET_DEPARTMENT", dataDepartment);
          }

          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  clearAll({ commit }) {
    commit("SET_DATA", {});
    commit("SET_PAGINATION", 0);
    commit("SET_CURRENTPAGE", 0);
    commit("SET_KEYWORD", "");
    // commit("CLEAR_FILTERS");
    commit("SET_DEPARTMENT_KEYWORD", null);
    commit("SET_CREATED_DATE", null);
    commit("SET_MODIFIED_DATE", null);
    commit("SET_TYPE_KEYWORD", null);
    commit("SET_SIZE_KEYWORD", null);
    commit("SET_FORMBODY");
    commit("SET_FORMBODY_FORM", 0);
  },
};

// to handle mutations
const mutations = {
  SET_DATA(state, payload) {
    state.data = payload;
  },

  SET_DEPARTMENT(state, payload) {
    state.selectDepartment = payload;
  },

  SET_SEARCHED_DATA(state, payload) {
    state.searchedData = payload;
  },

  SET_PAGINATION(state, payload) {
    state.totalPage = Math.ceil(payload / constant.SHOW_ITEMS_PER_PAGE);
    state.totalRecords = payload;
  },

  SET_CURRENTPAGE(state, payload) {
    state.currentPage = payload * 10;
    state.realPageNum = payload === 0 ? 1 : payload;
  },

  SET_LOADING(state, payload) {
    switch (payload) {
      case "fetching":
        state.isFetching = true;
        state.isFetched = false;
        state.isError = false;
        break;

      case "fetched":
        state.isFetching = false;
        state.isFetched = true;
        state.isError = false;
        break;

      case "error":
        state.isFetching = false;
        state.isFetched = false;
        state.isError = true;
        break;
    }
  },

  SET_FILTER(state, payload) {
    // Remove duplicate value before push to an array
    // Toggling array with a same value
    if (state.filters[payload.name] instanceof Array) {
      state.filters[payload.name] = state.filters[payload.name].filter((e) => {
        return e !== payload.value;
      });
    } else {
      state.filters[payload.name] = payload.value;
    }
  },

  SET_KEYWORD(state, payload) {
    state.keyword = payload;
  },

  SET_SEARCH_QUERY(state, payload) {
    state.currentSearchQuery = payload;
  },

  // CLEAR_FILTERS(state) {
  //   state.searchedData = [];

  //   constant.FILTER_LIST.map((val) => {
  //     state[val.name] = "";
  //     if (state.filters[val.name + val.solrSuffix] instanceof Array) {
  //       state.filters[val.name + val.solrSuffix] = [];
  //     } else {
  //       state.filters[val.name + val.solrSuffix] = "";
  //     }
  //   });

  //   state.currentPage = 0;
  // },

  SET_INITIAL_FILTER(state, payload) {
    state[payload.name] = payload.value;
  },

  SET_FORMBODY_FORM(state) {
    state.formBody.from = state.currentPage;
  },

  SET_DEPARTMENT_KEYWORD(state, payload) {
    state.departmentKeyword = payload;
  },

  SET_CREATED_DATE(state, payload) {
    state.createdDate = payload;
  },

  SET_MODIFIED_DATE(state, payload) {
    state.modifiedDate = payload;
  },

  SET_TYPE_KEYWORD(state, payload) {
    state.typeKeyword = payload;
  },

  SET_SIZE_KEYWORD(state, payload) {
    state.sizeKeyword = payload;
  },

  SET_FORMBODY(state) {
    const mustContent = [];

    if (state.departmentKeyword) {
      const matchDepartment = {
        match: { "Data.department": `${state.departmentKeyword}` },
      };
      mustContent.push(matchDepartment);
    }

    if (state.keyword) {
      const matchTitle = {
        match_phrase_prefix: { "Data.contentTitle": `${state.keyword}` },
      };
      mustContent.push(matchTitle);
    }

    if (state.createdDate) {
      const value = state.createdDate;
      const currMonth = value.getMonth() + 1;
      let currDate = value.getDate();
      const currYear = value.getFullYear();

      if (currDate < 10) {
        currDate = "0" + currDate;
      }

      let monthVal;
      if (currMonth < 10) {
        monthVal = "0" + currMonth;
      } else {
        monthVal = currMonth;
      }

      const formattedValue = currYear + "-" + monthVal + "-" + currDate;

      const matchCreatedDate = {
        match_phrase_prefix: { "Data.createdDate": `${formattedValue}` },
      };
      mustContent.push(matchCreatedDate);
    }

    if (state.modifiedDate) {
      const value = state.modifiedDate;
      const currMonth = value.getMonth() + 1;
      let currDate = value.getDate();
      const currYear = value.getFullYear();

      if (currDate < 10) {
        currDate = "0" + currDate;
      }

      let monthVal;
      if (currMonth < 10) {
        monthVal = "0" + currMonth;
      } else {
        monthVal = currMonth;
      }

      const formattedValue = currYear + "-" + monthVal + "-" + currDate;
      const matchCreatedDate = {
        match_phrase_prefix: { "Data.modifiedDate": `${formattedValue}` },
      };
      mustContent.push(matchCreatedDate);
    }

    if (state.typeKeyword) {
      const matchType = {
        match: { "Data.file.Extension": `${state.typeKeyword}` },
      };
      mustContent.push(matchType);
    }

    if (state.sizeKeyword) {
      let from = 0;
      let to = 0;

      switch (state.sizeKeyword) {
        case "0":
          from = 0;
          to = 1048576;
          break;
        case "1":
          from = 1048576;
          to = 5242880;
          break;
        case "2":
          from = 5242880;
          to = 9999999999;
          break;
      }

      const matchSize = {
        range: {
          "Data.file.Size.long": {
            gte: `${from}`,
            lte: `${to}`,
          },
        },
      };
      mustContent.push(matchSize);
    }

    mustContent.push(constant.MATCH_PHRASE);
    state.formBody.query.bool.must = mustContent;
  },
};
const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
