const WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY_VALUE;
const WEATHER_URL = import.meta.env.VITE_OPEN_WEATHER_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_BASE_URL;
const GEO_KEY = import.meta.env.VITE_GEO_API_KEY_VALUE;

export const fetchWeather = async (lat, lon, units) => {
  // console.log("FETCHING WEATHER DATA");
  const response = await fetch(
    `${WEATHER_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_KEY}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
};

export const fetchLocation = async (searchKeyword) => {
  //   console.log("FETCHING LOCATION DATA");
  try {
    const response = await fetch(
      `${GEO_URL}?text=${searchKeyword.toLowerCase()}&limit=7&lang=en&format=json&apiKey=${GEO_KEY}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!data.error) {
      return data;
    } else {
      alert('Having problems receiving data. Error: ' + data.message + ': ')
      throw Error(data.statusCode + ". " + data.error + ". " + data.message)
    }
  } catch (err) {
    console.log(err);
  }
};
