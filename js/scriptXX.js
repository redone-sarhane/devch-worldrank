"use strict";

const renderCountryData = function (data, countryCount = 0) {
  const parent = document.querySelector(".table__body");

  const countriesCount = document.querySelector(".found-count");
  countriesCount.textContent = `Found ${countryCount} countries`;

  const html = `
        <tr class="table__row table__row--body">
          <td class="table__data table__data--img">
            <div class="flag flag-loading">
              <img
                class="flag__img"
                src="${data.flags.svg}"
                alt="china Flag"
              />
            </div>
          </td>
          <td class="table__data table__data--name">${data.name.common}</td>
          <td class="table__data table__data--popu">${data.population}</td>
          <td class="table__data table__data--area">${data.area}</td>
          <td class="table__data table__data--region">${data.region}</td>
        </tr>
  `;

  // parent.insertAdjacentHTML("beforeend", html);

  parent.innerHTML += html;
};

const parent = document.querySelector(".table__body");
parent.innerHTML += "hello";

const getCountryData = async function (country) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const [data] = await response.json();
};

getCountryData("usa");

let filter = {},
  dataCountries = [];

const getCountryDataAll = async function () {
  // const response = await fetch(`https://restcountries.com/v3.1/all`);

  const response = await fetch(
    `https://restcountries.com/v3.1/all?independent?status=false&fields=flags,name,population,area,region`
  );

  // const region = "africa";

  // const response = await fetch(
  //   `https://restcountries.com/v3.1/region/${region}?independent?status=false&fields=flags,name,population,area,region`
  // );

  // const response = await fetch(
  //   `https://restcountries.com/v3.1/independent?status=true`
  // );

  // const response =
  // await fetch(`https://restcountries.com/v3.1/independent?status=false`);
  // await fetch(`https://restcountries.com/v3.1/all?fields=morocco,`);
  const data = await response.json();
  // console.log(data);

  // for (let i = 0; i < 10; i++) {
  //   renderCountryData(data[i]);
  // }

  let xx = [];

  let i = 0;
  data.forEach((dt, i) => {
    i++;
    // console.log(i);
    // renderCountryData(dt, i);

    // dataCountries.push({
    //   id: i,
    //   flag: dt.flags.svg,
    //   name: dt.name.common,
    //   population: dt.population,
    //   area: dt.area,
    //   region: dt.region,
    // });

    // xx.push(dt.name.common);
  });

  // for (let i = 0; i < 10; i++) {
  //   renderCountryData(data[i]);
  // }
  // console.log("data from", xx);
};

getCountryDataAll();

// /////////////////////////////////////////////////////
