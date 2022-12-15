import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiDayCloudyHigh,
  WiCloudy,
  WiShowers,
  WiRain,
  WiStormShowers,
  WiSnow,
} from "react-icons/wi/index";

const WeatherIcon = ({ id, size = 100 }) => {
  const [iconContent, setIconContent] = useState("");

  const weatherIcon = (id) => {
    if (id === 800) {
      setIconContent(
        <WiDaySunny size={`${size}%`} color="var(--color-sunny)" />
      );
      return;
    }
    if (800 < id && id < 803) {
      setIconContent(
        <WiDayCloudyHigh size={`${size}%`} color="var(--color-sunny)" />
      );
      return;
    }
    if (802 < id && id < 805) {
      setIconContent(
        <WiCloudy size={`${size}%`} color="var(--color-cloudy)" />
      );
      return;
    }
    if (id.toString()[0] === "2") {
      setIconContent(
        <WiStormShowers size={`${size}%`} color="var(--color-cloudy)" />
      );
      return;
    }
    if (id.toString()[0] === "3") {
      setIconContent(
        <WiShowers size={`${size}%`} color="var(--color-cloudy)" />
      );
      return;
    }
    if (id.toString()[0] === "5") {
      setIconContent(<WiRain size={`${size}%`} color="var(--color-cloudy)" />);
      return;
    }
    if (id.toString()[0] === "6") {
      setIconContent(
        <WiSnow size={`${size}%`} color="var(--color-snow)" />
      );
      return;
    }
    if (id.toString()[0] === "7") {
      setIconContent(
        <WiFog size={`${size}%`} color="var(--color-fog)" />
      );
      return;
    } else {
      setIconContent(
        <WiDaySunny size={`${size}%`} color="var(--color-sunny)" />
      );
      return;
    }
  };
  useEffect(() => {
    if (id) {
      weatherIcon(id);
    }
  }, [id]);
  return <>{iconContent}</>;
};

export default WeatherIcon;
