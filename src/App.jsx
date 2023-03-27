import { useEffect, useState, lazy } from "react";
import { fetchWeather } from "./fetch";

import SearchBar from "./components/Search/SearchBar";
import MainView from "./components/MainView/MainView";
import ForecastView from "./components/ForecastView/ForecastView";
// const ForecastView = lazy(() => import("./components/ForecastView/ForecastView"));

import ThemeToggleButton from "./components/UI/ThemeToggleButton";
import LoadingMain from "./components/UI/LoadingMain";
import Details from "./components/Detailsview/Details";

import classes from "./App.module.css";

function App() {
  const [currentLocation, setCurrentLocation] = useState({});
  const [units, setUnits] = useState("");
  const savedUnits = localStorage.getItem("units");
  const [locationTime, setLocationTime] = useState("");
  const [timeOffset, setTimeOffset] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    list: [
      { main: { temp: "", humidity: "" }, weather: [{ main: "", id: "" }] },
    ],
    city: {
      name: "",
    },
  });
  const gotLocationData = Object.keys(currentLocation).length > 0;

  const getWeather = async () => {
    setLoadingData(true);
    const data = await fetchWeather(
      currentLocation.lat,
      currentLocation.lon,
      units
    );
    if (data.cod < 400) {
      setCurrentWeather(data);
    } else {
      alert(`Error ${data.cod}. Data not available.`);
    }
    setLoadingData(false);
  };

  const updateLocation = (location) => {
    setCurrentLocation(location);
  };

  const handleLocationTime = (locationTime, totalOffset) => {
    setLocationTime(locationTime);
    setTimeOffset(totalOffset);
  };

  const handleUnitChange = () => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  useEffect(() => {
    if (savedUnits) {
      setUnits(savedUnits);
    } else {
      setUnits("metric");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(currentLocation).length > 0) {
      getWeather();
    }
    localStorage.setItem("units", units);
  }, [currentLocation, units]);

  return (
    <main className={classes.App}>
      <SearchBar updateLocation={updateLocation} location={currentLocation} />
      {!gotLocationData && !loadingData ? (
        <h1 className={classes["landing-header"]}>Find Weather Worldwide</h1>
      ) : null}
      {gotLocationData && loadingData ? <LoadingMain /> : null}
      {gotLocationData && !loadingData ? (
        <>
          <MainView
            location={currentLocation}
            weather={currentWeather}
            locationTime={locationTime}
            units={units}
          />
          <ForecastView
            setLocationTime={handleLocationTime}
            location={currentLocation}
            weather={currentWeather}
          />
          <Details
            location={currentLocation}
            weather={currentWeather}
            timeOffset={timeOffset}
            units={units}
          />
        </>
      ) : null}
      <footer className={classes["footer"]}>
        {gotLocationData ? (
          <button
            className={classes["units-button"]}
            onClick={handleUnitChange}
          >
            Change Units
          </button>
        ) : null}
        <ThemeToggleButton />
      </footer>
    </main>
  );
}

export default App;
