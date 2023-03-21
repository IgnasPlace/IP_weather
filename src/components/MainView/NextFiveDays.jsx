import classes from "./NextFiveDays.module.css";

const NextFiveDays = ({ weather }) => {
  const weekDays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const daysArray = weather.list.map((item) => {
    return [
      weekDays[new Date(item.dt_txt.substr(0, 10)).getDay()],
      item.main.temp_max,
      item.main.temp_min,
    ];
  });

  const currentDays = [
    daysArray[0][0],
    daysArray[8][0],
    daysArray[16][0],
    daysArray[24][0],
    daysArray[32][0],
  ];

  const forecast = currentDays.map((day, index) => {
    const currentDay = daysArray.filter((item) => item[0] === day);
    const currentDayMax = Math.max(
      ...currentDay.map((item) => Math.round(item[1]))
    );
    const currentDayMin = Math.min(
      ...currentDay.map((item) => Math.round(item[2]))
    );
    return {
      dayNow: currentDays[index],
      max: currentDayMax,
      min: currentDayMin,
    };
  });

  return (
    <div className={classes["weather-details"]}>
      {forecast.map((day) => {
        return (
          <div className={classes["weather-details-item"]} key={day.dayNow}>
            <h3>{day.dayNow}</h3>
            <div className={classes["weather-details-degrees"]}>
              <p>{day.max}&deg;</p>
              <p>{day.min}&deg;</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NextFiveDays;
