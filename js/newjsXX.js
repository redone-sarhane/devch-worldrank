const parent = document.querySelector(".table__body");

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
                onclick="${console.log("hello")}"
                src="${dataCountry.flags.svg}"
                alt="china Flag"
              />
            </div>
          </td>
          <td class="table__data table__data--name">${
            dataCountry.name.common
          }</td>
          <td class="table__data table__data--popu">${
            dataCountry.population
          }</td>
          <td class="table__data table__data--area">${dataCountry.area}</td>
          <td class="table__data table__data--region">${dataCountry.region}</td>
        </tr>
  `;

  parent.innerHTML += html;
};

const renderCountriesData = async () => {
  const countriesDt = await getDataApi(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,area,region"
  );

  const countriesNames = getAllCountriesNames();

  //   console.log(countriesDt);
  // countriesDt.forEach((countryDt) => {
  //   renderCountryData(countryDt);

  // });
};

const getAllCountriesNames = async () => {
  const response = await fetch(
    // "https://restcountries.com/v3.1/all/?fields=name"
    "https://restcountries.com/v3.1/region/antarctic/?fields=name"
  );
  const data = await response.json();
  //   console.log(data);

  const countries = [];
  data.forEach((dt) => {
    countries.push(dt.name.common);
  });

  //   console.log(countries);
  countries.sort();

  countries.forEach(async (country) => {
    // console.log("Country:: ", country);
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const [dataCountry] = await response.json();
    renderCountryData(dataCountry);
    // console.log(dataCountry)
    //   parent.innerHTML += `
    //   <tr class="table__row table__row--body">
    //   <td class="table__data table__data--img">
    //     <div class="flag flag-loading">
    //       <img
    //         class="flag__img"
    //         alt=""
    //       />
    //     </div>
    //   </td>
    //   <td class="table__data table__data--name">
    //     <div class="data data-loading"></div>
    //   </td>

    //   <td class="table__data table__data--popu">
    //     <div class="data data-loading"></div>
    //   </td>
    //   <td class="table__data table__data--area">
    //     <div class="data data-loading"></div>
    //   </td>

    //   <td class="table__data table__data--region">
    //     <div class="data data-loading"></div>
    //   </td>
    // </tr>
    // `;
  });

  return countries;
};

renderCountriesData();

// getAllCountriesNames();

const obj = { name: "red", lname: "sar", age: 20 };

console.log("entries Object", Object.entries(obj));

///////////
const imgs = document.querySelectorAll(".flag__img");

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
  });

  // update regions filter
  const regions = document.querySelectorAll(".checkbox-rect__input");
  regions.forEach(function (region) {
    region.addEventListener("change", function () {
      if (region.checked) {
        filter.region.push(region.value);
        console.log("checked::", filter);
      } else {
        // console.log(region.value, filter.region.indexOf(region.value));

        filter.region.splice(filter.region.indexOf(region.value), 1);

        console.log("Unchecked::", filter);

        // filter.region.push(region.value);
      }
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

const filterByRegions = async function () {
  const dataCountriesX = [];

  for (const reg of filter.region) {
    const data = await getDataApi(
      `https://restcountries.com/v3.1/region/${reg}`
    );
    console.log(data);
    dataCountriesX.push(...data);
  }
  console.log(dataCountriesX);

  return dataCountriesX;
};

// filterByRegions();

(async function () {
  const data = await getDataApi(
    // "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital"
    "https://restcountries.com/v3.1/all"
  );
  console.log(data);
})();




//// maybe we will need later
const getDataCountries = async function (dataCountry) {
  const data = await getDataApi(
    "https://restcountries.com/v3.1/region/antarctic"
  );

  //   data = data.sort();
  console.log(data);

  data.forEach((dt) => {
    // renderCountryData(dt);
  });

  function compare(a, b) {
    if (a.last_nom < b.last_nom) {
      return -1;
    }
    if (a.last_nom > b.last_nom) {
      return 1;
    }
    return 0;
  }

  // objs.sort(compare);

  let sorted = data.sort((a, b) =>
    a.name.common > b.name.common ? 1 : a.name.common < b.name.common ? -1 : 0
  );

  // return a.name.common;
  // return a.name.common;
  // return a.area - b.area;
  sorted.forEach((dt) => {
    renderCountryData(dt);
  });

  console.log("ahmed" > "ader");

  //   console.log(data.sort());
};
