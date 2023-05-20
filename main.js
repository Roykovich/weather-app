const API_KEY = "";

const form = document.querySelector(".search form");
const inputCity = document.querySelector(".search input");
const info = document.querySelector(".info");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = inputCity.value;

  // agregar coso para que se pueda elegir entre metrico o imperial
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputVal}?unitGroup=metric&key=${API_KEY}`;

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { resolvedAddress, days } = data;

      const city = document.createElement("div");
      city.classList.add("info-container");

      const weatherMarkUp = `
        <h2>${resolvedAddress}</h2>
        <p>${days[0]["temp"]}°<sup>c</sup></p>
        <p>${days[0]["conditions"]} ${Math.round(
        days[0]["tempmax"]
      )}°/${Math.round(days[0]["tempmin"])}°</p>
        <p>${days[0]["description"]}</p>
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
