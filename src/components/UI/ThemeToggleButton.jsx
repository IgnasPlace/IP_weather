import { useEffect, useState } from "react";
import classes from "./ThemeToggleButton.module.css";

const setVariables = (vars) => {
  const root = document.querySelector(":root");
  Object.entries(vars).forEach((v) => root.style.setProperty(v[0], v[1]));
};

const ligthThemeVars = {
  "--g-background-gradient": "linear-gradient(to right, #befedd, #fbffdb)",
  "--g-text-color-1": "#333",
  "--g-card-background": "#dfdfdf69",
  "--g-color-separation": "#e4e3e369",

  "--color-cloudy": "rgba(40, 100, 212, 0.758)",
  "--color-sunny": "rgb(244, 169, 57)",
  "--color-snow": "#777",
  "--color-fog": "#777",
};
const darkThemeVars = {
  "--g-background-gradient": "linear-gradient(to right, #42275a, #000328)",
  "--g-text-color-1": "#ddd",
  "--g-card-background": "#dfdfdf34",
  "--g-color-separation": "#83838369",

  "--color-cloudy": "#8884d8",
  "--color-sunny": "rgb(244, 169, 57)",
  "--color-snow": "rgba(254, 254, 254, 0.774)",
  "--color-fog": "rgba(254, 254, 254, 0.774)",
};

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState("");
  const savedTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "light") {
      setVariables(ligthThemeVars);
    }
    if (theme === "dark") {
      setVariables(darkThemeVars);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className={classes["button-container"]}>
      <button className={classes["button"]} onClick={handleThemeChange}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>
    </div>
  );
};

export default ThemeToggleButton;




// const ligthThemeVars = {
//   "--g-background-gradient": "linear-gradient(to right, #74ebd5, #acb6e5)",
//   "--g-text-color-1": "#333",
//   "--g-card-background": "#dfdfdf69",
//   "--g-color-separation": "#dfdfdf69",

//   "--color-cloudy": "rgba(40, 100, 212, 0.758)",
//   "--color-sunny": "rgb(225, 190, 14)",
//   "--color-snow": "rgba(254, 254, 254, 0.774)",
//   "--color-fog": "rgba(254, 254, 254, 0.774)",
// };
// const darkThemeVars = {
//   "--g-background-gradient": "linear-gradient(to right, #42275a, #000328)",
//   "--g-text-color-1": "#ddd",
//   "--g-card-background": "#dfdfdf34",
//   "--g-color-separation": "#dfdfdf69",

//   "--color-cloudy": "rgba(174, 200, 250, 0.774)",
//   "--color-sunny": "rgba(247, 221, 88, 0.928)",
//   "--color-snow": "rgba(254, 254, 254, 0.774)",
//   "--color-fog": "rgba(254, 254, 254, 0.774)",
// };