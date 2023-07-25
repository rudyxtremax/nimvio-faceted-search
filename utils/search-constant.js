const searchConfig = {
  ROW_PER_PAGE: 10,
  FILTER_LIST: [
    {
      title: "Education",
      name: "school_journey",
      solrSuffix: "_ss",
      type: "checkbox",
      properties: {
        showCount: false,
      },
    },
    {
      title: "Content Type",
      name: "content_type",
      solrSuffix: "_s",
      type: "checkbox",
      properties: {
        showCount: true,
      },
    },
    {
      title: "News Category",
      name: "news_category",
      solrSuffix: "_s",
      type: "checkbox",
      properties: {
        showCount: true,
      },
    },
  ],
  MATCH_PHRASE: {
    match_phrase: {
      TemplateName: "Page Article",
    },
  },
  SELECT_DEPARTMENT: [
    {
      value: "department1",
      name: "Department 1",
    },
    {
      value: "department2",
      name: "Department 2",
    },
    {
      value: "department3",
      name: "Department 3",
    },
    {
      value: "department4",
      name: "Department 4",
    },
    {
      value: "department5",
      name: "Department 5",
    },
  ],
};

const constant = {
  API_URL: `https://api.nimvio.com/cda/es/v1`,
  PROJECT_ID: `/Project_6ac91313-0da2-4260-bc33-e93d4295a915`,
  SHOW_ITEMS_PER_PAGE: searchConfig.ROW_PER_PAGE,
  FILTER_LIST: searchConfig.FILTER_LIST,
  SELECT_DEPARTMENT: searchConfig.SELECT_DEPARTMENT,
  MATCH_PHRASE: searchConfig.MATCH_PHRASE,
  ROW_PER_PAGE: 10,
};

export default constant;
