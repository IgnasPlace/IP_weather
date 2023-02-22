
const WEATHER_URL = import.meta.env.VITE_OPEN_WEATHER_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_BASE_URL;

export const fetchWeather = async (lat, lon, units) => {
  // console.log("FETCHING WEATHER DATA");

  try {
    const response = await fetch(
      `${WEATHER_URL}?lat=${lat}&lon=${lon}&units=${units}`
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

export const fetchLocation = async (searchKeyword) => {
    // console.log("FETCHING LOCATION DATA");
  try {
    const response = await fetch(
      `${GEO_URL}?keyWord=${searchKeyword.toLowerCase()}`
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
