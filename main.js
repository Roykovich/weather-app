const API_KEY = "";

const form = document.querySelector(".search form");
const inputCity = document.querySelector(".search input");
const info = document.querySelector(".info .info-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = inputCity.value;

  // agregar coso para que se pueda elegir entre metrico o imperial
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}&unints=metric`;

  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, weather, sys } = data;

      const city = document.createElement("div");
      // city.classList.add("something")

      const weatherMarkUp = `
        <h2>${name}</h2>
        <p>${sys.country}</p>
        <p>${Math.round(main.temp)}C</p>
        <p>${weather[0]["description"]}</p>
      `;

      city.innerHTML = weatherMarkUp;

      info.appendChild(city);
    })
    .catch(() => {
      console.log("AAAGH");
    });

  form.reset();
  inputCity.focus();
});
