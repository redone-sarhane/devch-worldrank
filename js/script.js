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

const DataLoadingDemo = function () {
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

  for (let i = 1; i <= 15; i++) {
    parent.innerHTML += DataLoadingHtml;
  }
};

// DataLoadingDemo();

// Define a global object to store the fetched data
let globalDataCountries;

// Function to fetch and store data

const fetchDataAndStoreGlobally = async function (url) {
  if (globalDataCountries) {
    console.log("gl", globalDataCountries.length);
    return globalDataCountries;
  }
  const data = await getDataApi(url);
  globalDataCountries = data;
  console.log("gl", globalDataCountries.length);
  return globalDataCountries;
};

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
    sortData();
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
    sortData();
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

const renderData = function () {
  // DataLoadingDemo();
  // sortData();
};

defaultData();
onChangeUpdateData();

const sortData = async function (data) {
  DataLoadingDemo();
  // parent.innerHTML = "";

  await fetchDataAndStoreGlobally(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,area,region,independent,unMember"
  );
  data = globalDataCountries;

  console.log(data.length);

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

    default:
      console.log("element selected does not exist");
  }

  let dataSorted = [];
  sorted.filter((a) => {
    if (
      filter.region.includes(a.region.toLowerCase()) &&
      filter.memberOfUN == a.unMember &&
      filter.independent == a.independent
    )
      dataSorted.push(a);
  });

  console.log(dataSorted);

  parent.innerHTML = "";
  let countryCount = 0;
  dataSorted.forEach((el) => {
    renderCountryData(el);
    countryCount++;
  });

  document.querySelector(
    ".found-count"
  ).innerHTML = `Found ${countryCount} countries`;
};

sortData();
