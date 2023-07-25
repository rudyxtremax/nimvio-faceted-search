const fqBuilder = (facetName, value) => {
  const query = `&fq=${facetName}:(${value})`;

  return query;
};

const fqGroupValue = (items) => {
  let groupValue = "";

  if (items.length > 0) {
    items.map((val) => {
      groupValue += `"${val}" OR `;
      return val;
    });

    return groupValue.slice(0, -4);
  }

  return `("${items[0]}")`;
};

const queryStringHelper = (query) => {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(query.key, query.value);
    window.location.search = searchParams.toString();
  }
};

// Get query parameter
// https://goo.gl/j7HoSF

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const insertParam = (key, value) => {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  const kvp = window.location.search.substr(1).split("&");
  if (kvp[0] === "") {
    const path =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      key +
      "=" +
      value;
    window.history.pushState({ path }, "", path);
  } else {
    let i = kvp.length;
    let x;
    while (i--) {
      x = kvp[i].split("=");

      if (x[0] === key) {
        x[1] = value;
        kvp[i] = x.join("=");
        break;
      }
    }

    if (i < 0) {
      kvp[kvp.length] = [key, value].join("=");
    }

    const refresh =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      kvp.join("&");
    window.history.pushState({ path: refresh }, "", refresh);
  }
};

const splitStringNumber = (value) => {
  const textArray = [value.match(/[a-z]*/)[0], value.match(/\d+$/)[0]];
  return textArray.join(" ");
};

const convertToMB = (value) => {
  return (value / 1048576).toFixed(2) + " MB";
};

export default {
  fqBuilder,
  fqGroupValue,
  queryStringHelper,
  getParameterByName,
  insertParam,
  splitStringNumber,
  convertToMB,
};
