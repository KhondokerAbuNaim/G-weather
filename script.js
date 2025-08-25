const API_KEY = "736ac5b49e829663c10f505443a15606"; // এখানে আপনার API Key বসান
let isCelsius = true;

// এলিমেন্টগুলো
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const gpsBtn = document.getElementById("gpsBtn");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const unitToggle = document.getElementById("unitToggle");
const darkModeToggle = document.getElementById("darkModeToggle");

// আবহাওয়া ডাটা আনার ফাংশন
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=bn`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
  } else {
    cityName.textContent = "শহর পাওয়া যায়নি!";
    description.textContent = "";
    temperature.textContent = "--";
  }
}

// সার্চ বাটন
searchBtn.addEventListener("click", () => {
  if (cityInput.value !== "") {
    getWeather(cityInput.value);
  }
});

// GPS বাটন
gpsBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=bn`;
      const res = await fetch(url);
      const data = await res.json();
      cityName.textContent = data.name;
      description.textContent = data.weather[0].description;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
    });
  }
});

// ইউনিট টগল °C ↔ °F
unitToggle.addEventListener("click", () => {
  let temp = parseInt(temperature.textContent);
  if (isCelsius) {
    temp = Math.round((temp * 9) / 5 + 32);
    temperature.textContent = `${temp}°F`;
  } else {
    temp = Math.round(((temp - 32) * 5) / 9);
    temperature.textContent = `${temp}°C`;
  }
  isCelsius = !isCelsius;
});

// ডার্ক মোড
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ডিফল্ট শহর
getWeather("Dhaka");
