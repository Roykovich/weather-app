const API_KEY = "";

const form = document.querySelector(".search form");
const inputCity = document.querySelector(".search input");
const info = document.querySelector(".info");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = inputCity.value;

  const date = new Date();

  const { yesterday: dayBefore, nextDays: fiveDaysAfter } = formatDate(date);

  console.log(dayBefore, fiveDaysAfter);

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

      const city = document.createElement("div");
      city.classList.add("info-container");

      const weatherMarkUp = `
        <h3>${resolvedAddress}</h3>
        <p class="currentTemperature">${Math.round(days[1]["temp"])}°</p>
        <div class="condition-container">
        <p class="condition">${days[1]["conditions"]}</p> 
        <p class="temps">${Math.round(
          days[0]["tempmax"]
        )}°<span class="slash">/</span>${Math.round(days[1]["tempmin"])}°</p>
        </div>
        <p>${days[1]["description"]}</p>
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
