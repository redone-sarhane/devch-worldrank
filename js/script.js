////

const parent = document.querySelector(".table__body");

//Get data API function
const getDataApi = async (urlApi) => {
  const response = await fetch(urlApi);
  const data = await response.json();

  return data;
};

const renderCountryData = function (dataCountry) {
  const html = `
          <tr class="table__row table__row--body">
            <td class="table__data table__data--img">
              <div class="flag flag-loading">
  
             
                <img
                  class="flag__img"
                  src="${dataCountry.flags.svg}"
                  alt="china Flag"
                />
              </div>
            </td>
            <td class="table__data table__data--name">${dataCountry.name.common}</td>
            <td class="table__data table__data--popu">${dataCountry.population}</td>
            <td class="table__data table__data--area">${dataCountry.area}</td>
            <td class="table__data table__data--region">${dataCountry.region}</td>
          </tr>
    `;

  parent.innerHTML += html;
};

// Define a global object to store the fetched data
let globalDataCountries;

// Function to fetch and store data 

const DataLoadingHtml = ` <tr class="table__row table__row--body">
    <td class="table__data table__data--img">
      <div class="flag flag-loading">
        <!-- <img
          class="flag__img"
          src="imgs/example data/algeriaFlag.webp"
          alt="" 
          /> -->
      </div>
      <!-- src="imgs/example data/algeriaFlag.webp" -->
    </td>
    <td class="table__data table__data--name">
      <div class="data data-loading"></div>
    </td>

    <td class="table__data table__data--popu">
      <div class="data data-loading"></div>
    </td>
    <td class="table__data table__data--area">
      <div class="data data-loading"></div>
    </td>

    <td class="table__data table__data--region">
      <div class="data data-loading"></div>
    </td>
  </tr>`;

const fetchDataAndStoreGlobally = async function (url) {
  if (globalDataCountries) {
    // console.log(
    //   "Data already fetched. Using cached data:",
    //   globalDataCountries
    // );
    // return Promise.resolve(globalDataCountries);

    console.log("gl", globalDataCountries.length);
    for (let i = 1; i <= globalDataCountries.length; i++) {
      parent.innerHTML += DataLoadingHtml;
    }
    return globalDataCountries;
  }

  const data = await getDataApi(url);
  globalDataCountries = data;

  console.log("gl", globalDataCountries.length);
  // console.log("Data fetched and stored globally:", globalDataCountries);

  for (let i = 1; i <= globalDataCountries.length; i++) {
    parent.innerHTML += DataLoadingHtml;
  }

  return globalDataCountries;
};

// for (let i = 1; i <= 5; i++) {
//   parent.innerHTML += DataLoadingHtml;
// }

// fetchDataAndStoreGlobally("https://restcountries.com/v3.1/all");

// getDataCountries();

// filter functions
let filter = {
  searchQuery: "",
  sortBy: "name",
  region: [],
  memberOfUN: false,
  independent: false,
};

const defaultData = () => {
  const regions = document.querySelectorAll(".checkbox-rect__input");
  regions.forEach((region) => {
    if (region.checked) filter.region.push(region.value);
  });
};

const onChangeUpdateData = () => {
  // update sortBy filter
  const selectBox = document.querySelector(".filter__select-box");
  selectBox.addEventListener("change", function () {
    filter.sortBy = this.value;
    console.log(filter);
    sortData();
  });

  // update regions filter
  const regions = document.querySelectorAll(".checkbox-rect__input");
  regions.forEach(function (region) {
    region.addEventListener("change", function () {
      if (region.checked) {
        filter.region.push(region.value);
        console.log("checked::", filter);
      } else {
        filter.region.splice(filter.region.indexOf(region.value), 1);
        console.log("Unchecked::", filter);
      }
      sortData();
    });
  });

  const indeCntry = document.getElementById("independent-value");
  indeCntry.addEventListener("change", function () {
    if (indeCntry.checked) {
      filter.independent = true;
      console.log(filter);
    } else {
      filter.independent = false;
      console.log(filter);
    }
  });

  const memberOfUN = document.getElementById("memberofun-value");
  memberOfUN.addEventListener("change", function () {
    if (memberOfUN.checked) {
      filter.memberOfUN = true;
      console.log(filter);
    } else {
      filter.memberOfUN = false;
      console.log(filter);
    }
  });

  const searchInput = document.querySelector(".search__input");
  // searchInput.addEventListener("keyup", function () {
  //   if (
  //     searchInput.value.trim() &&
  //     searchInput.value.trim() != filter.searchQuery
  //   ) {
  //     setTimeout(() => {
  //       filter.searchQuery = searchInput.value.trim();
  //       console.log(filter);
  //     }, 0);
  //   }
  //   //  console.log("its eampty");
  // });
};

defaultData();
onChangeUpdateData();

const sortData = async function (data) {
  // data = await getDataApi("https://restcountries.com/v3.1/region/antarctic");
  await fetchDataAndStoreGlobally(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,area,region"
  );
  data = globalDataCountries;
  // await getDataApi("https://restcountries.com/v3.1/all");
  // console.log(`data::(${data.length}`, data);

  console.log(data.length);

  parent.innerHTML = "";

  let sorted;

  switch (filter.sortBy) {
    case "name":
      sorted = data.sort((a, b) =>
        a.name.common > b.name.common
          ? 1
          : a.name.common < b.name.common
          ? -1
          : 0
      );
      break;
    case "region":
      sorted = data.sort((a, b) =>
        a.region > b.region ? 1 : a.region < b.region ? -1 : 0
      );
      break;
    case "population":
      sorted = data.sort((a, b) => a.population - b.population);
      break;
    case "area":
      sorted = data.sort((a, b) => a.area - b.area);
      break;

    // default:
    //   break;
  }

  let dataSorted = [];
  sorted.filter((a) => {
    if (filter.region.includes(a.region.toLowerCase())) dataSorted.push(a);
  });

  // return a.region == "Africa";
  // let dataSorted = [];

  // data.forEach((dt) => {
  // if (dt.region == "africa") dataSorted.push(dt);

  // console.log(dt.region == "Africa");
  // });

  // console.log(Array.prototype.filter.call(data, (x) => x.region == "africa"));

  console.log(
    // `sorted by(${filter.sortBy}), regions:(${filter.region.join(", ")})`,
    dataSorted
  );

  // Object.filter();

  dataSorted.forEach((el) => renderCountryData(el));
};

sortData();

// const selectBox = document.querySelector(".filter__select-box");
// selectBox.addEventListener("change", function () {
//   filter.sortBy = this.value;
//   // sortData();
//   console.log(filter);
// });

console.log(filter.region.includes("americas".slice(1, -2)));

console.log("americas".slice(1, "americas".length));
