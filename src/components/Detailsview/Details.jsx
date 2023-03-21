import classes from "./Details.module.css";
import { TfiLocationArrow } from "react-icons/tfi";
import { BsDroplet } from "react-icons/Bs";
import { FiClock } from "react-icons/Fi";
import { WiSunrise, WiSunset } from "react-icons/wi/index";

const Details = ({ weather, timeOffset, units }) => {
  const hasData = weather.list[0].main.temp !== "";
  let windSpeed;
  let sunRise;
  let sunSet;

  if (hasData) {
    sunRise = new Date(timeOffset + weather.city.sunrise * 1000)
      .toString()
      .substr(16, 5);
    sunSet = new Date(timeOffset + weather.city.sunset * 1000)
      .toString()
      .substr(16, 5);
    if (units === "metric") {
      windSpeed = Math.round(weather.list[0].wind.speed * 3.6) + " km/h";
    } else {
      windSpeed = Math.round(weather.list[0].wind.speed) + " mph";
    }
  }

  return (
    <section className={classes["details-container"]}>
      {hasData ? (
        <div className={classes["details-info"]}>
          <div className={classes["humidity-wind-info"]}>
            <div className={classes["info-card"]}>
              <div className={classes["icon-humidity"]}>
                <BsDroplet />
              </div>
              <h4>Humidity</h4>
              <span>{weather.list[0].main.humidity}%</span>
            </div>
            <div className={classes["info-card"]}>
              <div className={classes["icon-wind"]}>
                <TfiLocationArrow
                  style={{
                    transform: `rotate(${weather.list[0].wind.deg - 136}deg)`,
                  }}
                />
              </div>
              <h4>Wind</h4>
              <span>{windSpeed}</span>
            </div>
          </div>
          <div className={classes["sunrise-sunset-info"]}>
            <div className={classes["info-card"]}>
              <div className={classes["icon-sunrise"]}>
                <WiSunrise size={"5rem"} />
              </div>
              <h4>Sunrise</h4>
              <span>
                {sunRise} <FiClock size="1.5rem" />
              </span>
            </div>
            <div className={classes["info-card"]}>
              <div className={classes["icon-sunset"]}>
                <WiSunset size={"5rem"} />
              </div>
              <h4>Sunset</h4>
              <span>
                {sunSet} <FiClock size="1.5rem" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Details;
