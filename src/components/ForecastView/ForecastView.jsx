import { useState, useEffect } from "react";
import classes from "./ForecastView.module.css";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const ForecastView = ({ weather, location, setLocationTime }) => {
  const hasData = weather.list[0].main.temp !== "";
  const dataOfNext24Hours = weather.list.slice(0, 8);
  const [labels, setLabels] = useState([]);
  const [tempData, setTempData] = useState([]);

  const locationOffset = location.timezone.offset_STD_seconds * 1000;
  const localOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const totalOffset = locationOffset + localOffset;

  const locationTime = (new Date(totalOffset + (new Date().getTime()))).toString().substr(16, 5);


  useEffect(() => {
    if (hasData) {
      setLabels(
        dataOfNext24Hours.map((item) => {
          const locationHourForecast = new Date(totalOffset + item.dt * 1000);
          return locationHourForecast.toString().substr(16, 5);
        })
      );
      setTempData(
        dataOfNext24Hours.map((item) => {
          return Math.round(item.main.temp)
        })
      );
      setLocationTime(locationTime, totalOffset);
    }
  }, [weather]);

  const chartData = tempData.map((item, index) => {
    return {
      name: labels[index],
      Temperature: item,
    };
  });

  const chart = (
    <ResponsiveContainer>
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 20, left: -40, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-cloudy)" stopOpacity={0.6} />
            <stop offset="95%" stopColor="var(--color-cloudy)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tick={{ fill: "var(--g-text-color-1)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="Temperature"
          type="number"
          domain={["dataMin - 1", "dataMax + 1"]}
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend
          verticalAlign="top"
          payload={[
            {
              value: "Temperature next 24 hours",
              color: "var(--g-text-color-1)",
            },
          ]}
          align="left"
          iconSize={0}
          wrapperStyle={{
            fontSize: "2rem",
            left: "20px",
            marginLeft: "-5px",
            paddingBottom: "15px",
            width: "fit-content",
          }}
        />
        <Area
          label={{
            fill: "var(--g-text-color-1)",
            fontSize: 15,
            position: { x: 15, y: -10 },
          }}
          dot={{ stroke: "var(--color-cloudy)", strokeWidth: 5, r: 1 }}
          type="monotone"
          dataKey="Temperature"
          stroke="var(--color-cloudy)"
          fillOpacity={0.7}
          fill="url(#colorTemp)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <section className={classes["forecast-view-container"]}>
      {hasData ? <div className={classes["forecast-info"]}>{chart}</div> : null}
      
    </section>
  );
};

export default ForecastView;
