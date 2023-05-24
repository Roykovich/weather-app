const API_KEY = "3L6JVUZFBDJ8X2L8HNU25Q3XP";

const $ = (selector) => document.querySelector(selector);

const headerTitle = $("header h1");
const form = $(".search form");
const inputCity = $(".search input");
const info = $(".info");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = inputCity.value;

  const date = new Date();

  const { yesterday: dayBefore, nextDays: fiveDaysAfter } = formatDate(date);

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputVal}/${dayBefore}/${fiveDaysAfter}?unitGroup=metric&key=${API_KEY}`;

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { resolvedAddress, days } = data;

      const today = days[1];

      const city = document.createElement("div");
      city.classList.add("info-container");

      // En chance of rain agregar una posibilidad de que agarre el preciptype y dependiendo de que sea decir precipitacion de lluvia o nevada
      const weatherMarkUp = `
        <h2 class="city-title">${resolvedAddress}</h2>
        <div class="city-temperature-container">
          <div class="current-temperature-container">
            <h1 class="current-temperature">
              ${Math.round(
                today["temp"]
              )}°<span class="current-unit-system"></span>
            </h1>
            <div class="condition-container">
              <p class="condition">${today["conditions"]}</p> 
              <p class="temps">${Math.round(today["tempmax"])}°
                <span class="slash">/</span>${Math.round(today["tempmin"])}°
              </p>
            </div>
          </div>
          <div class="detailed-information-container">
            <p class="detailed-information-description">${
              today["description"]
            }</p>
            <div class="detailed-information-columns">
              <div class="detailed-column">
                <p>Feels like: <span class="detailed-value">${Math.round(
                  today["feelslike"]
                )}°</></p>
                <p>Humidity: <span class="detailed-value">${Math.round(
                  today["humidity"]
                )}%</></p>
                <p>Pressure: <span class="detailed-value">${Math.round(
                  today["pressure"]
                )}mbar</></p>
                <p>Chance of Precip: <span class="detailed-value">${
                  today["precipprob"]
                }%</></p>
              </div>
              <div class="detailed-column">
                <p>Sunrise: <span class="detailed-value">${today[
                  "sunrise"
                ].slice(0, -3)}</></p>
                <p>Sunset: <span class="detailed-value">${today["sunset"].slice(
                  0,
                  -3
                )}</></p>
                <p>UV: <span class="detailed-value">${today["uvindex"]}</></p>
              </div>
            </div>
          </div>
        </div>
      `;

      city.innerHTML = weatherMarkUp;

      info.appendChild(city);
    })
    .catch((e) => {
      console.log(e);
    });

  form.reset();
  inputCity.focus();
});

const formatDate = (date) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let yesterday = ("0" + (date.getDate() - 1)).slice(-2);
  let nextFivedays = ("0" + (date.getDate() + 4)).slice(-2);

  return {
    yesterday: `${year}-${month}-${yesterday}`,
    nextDays: `${year}-${month}-${nextFivedays}`,
  };
};
