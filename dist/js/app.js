window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".degree-section");
  let temeperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/110b1a1dc320e83b631ead2ad93c4acd/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elements from the API
          console.log(temperature);
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Set Icons
          setIcons(icon, document.querySelector(".icon"));

          //Formula for degree
          let celisusDegree = (temperature - 32) * (5 / 9);
          //Change temperature to Celsius / Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temeperatureSpan.textContent === "F") {
              temeperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celisusDegree);
            } else {
              temeperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
