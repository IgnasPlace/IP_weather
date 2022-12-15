import classes from "./MainView.module.css";

import CurrentTemp from "./CurrentTemp";
import NextFiveDays from "./NextFiveDays";

const MainView = ({ weather, location, locationTime, units }) => {
  const hasData = weather.list[0].main.temp !== "";
  if (hasData) {
    // console.log(weather);
  }

  return (
    <section className={classes["main-view-container"]}>
      {hasData ? (
        <div className={classes["main-info"]}>
          <CurrentTemp
            weather={weather}
            location={location}
            locationTime={locationTime}
            units={units}
          />
          <NextFiveDays weather={weather} location={location} />
        </div>
      ) : null}
    </section>
  );
};

export default MainView;
