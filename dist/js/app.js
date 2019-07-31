window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let api = `https://api.darksky.net/forecast/110b1a1dc320e83b631ead2ad93c4acd/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          const location = data.timezone;
          const celisusDegree = (temperature - 32) * (5 / 9);

          //Set DOM Elements from the API

          temperatureDescription.textContent = summary;

          setDeafultTemperature(
            celisusDegree,
            document.querySelector(".temperature-degree")
          );

          changeToF(
            celisusDegree,
            document.querySelector(".temperature-degree")
          );

          setLocation(location, document.querySelector(".location-timezone"));

          //Set Icons
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  } else {
    //error handling
    alert("Please allow the use of your location");
  }

  //Refactored Functions
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function setLocation(location, locationTimezone) {
    const cleanLocation = location
      .split("/")
      .pop()
      .replace(/_/g, " ");
    return (locationTimezone.textContent = cleanLocation);
  }

  function setDeafultTemperature(celisusDegree, defaultTemp) {
    const temp = Math.floor(celisusDegree);
    return (defaultTemp.textContent = temp);
  }

  function changeToF(celisusDegree, fTemp) {
    const temperatureSection = document.querySelector(".degree-section");
    const temeperatureSpan = document.querySelector(".degree-section span");
    const convertF = Math.floor(celisusDegree * (9 / 5) + 32);
    temperatureSection.addEventListener("click", () => {
      if (temeperatureSpan.textContent === "C") {
        temeperatureSpan.textContent = "F";
        return (fTemp.textContent = convertF);
      } else {
        temeperatureSpan.textContent = "C";
        setDeafultTemperature(
          celisusDegree,
          document.querySelector(".temperature-degree")
        );
      }
    });
  }
});
