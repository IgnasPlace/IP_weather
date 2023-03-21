import classes from "./CurrentTemp.module.css";
import WeatherIcon from "../UI/WeatherIcon";
import { FiClock } from "react-icons/Fi";

const CurrentTemp = ({ weather, location, locationTime, units }) => {
  const degreeSymbol = units === "metric" ? <h3>&#8451;</h3> : <h3>&#8457;</h3>;

  const locationName = (
    <h1 className={classes["temperature-text-city-name"]}>
      {location.suburb ? location.suburb : null}
      {location.suburb && location.city ? ", " : null}
      {location.city ? location.city : null}
      {!location.city && !location.suburb ? location.address_line1 : null}
    </h1>
  );

  const temperatureAndIcon = (
    <div className={classes["temperature-degrees-now"]}>
      <div className={classes["temperature-text-number-container"]}>
        <h2 className={classes["temperature-text-number"]}>
          {Math.round(weather.list[0].main.temp)}
          <div className={classes["temperature-text-symbol"]}>
            {degreeSymbol}
          </div>
        </h2>
      </div>
      <WeatherIcon id={weather.list[0].weather[0].id} size="70" />
    </div>
  );

  const timeAndCondition = (
    <div className={classes["weather-condition-time-container"]}>
      <p>
        <span>{locationTime}</span>
        <FiClock size="1.3rem" />
      </p>
      <p className={classes["weather-condition"]}>
        {weather.list[0].weather[0].main}
      </p>
    </div>
  );

  return (
    <div className={classes["weather-temperature"]}>
      {locationName}
      {temperatureAndIcon}
      {timeAndCondition}
    </div>
  );
};

export default CurrentTemp;
