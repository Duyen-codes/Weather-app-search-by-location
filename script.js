const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cors",
  });

  const respData = await resp.json();

  displayWeather(respData);
}

function displayWeather(data) {
  const temp = KtoC(data.main.temp);
  const feelsLike = KtoC(data.main.feels_like);
  const weatherDesc = data.weather[0].description;
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>${search.value}</h2>
    <h1>${temp}°C</h1>
   <p>Feels like: ${feelsLike}°C</p>
    <p>${weatherDesc}</p>
    `;

  main.innerHTML = "";
  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (location) {
    getWeatherByLocation(city);
  }
});
