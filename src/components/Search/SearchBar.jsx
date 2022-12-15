import React, { useState, useEffect } from "react";
import { fetchLocation } from "../../fetch";
import classes from "./SearchBar.module.css";
import { HiX } from "../../../node_modules/react-icons/hi";

const SearchBar = ({ updateLocation }) => {
  const [searchParam, setSearchParam] = useState("");
  const [locationSugestions, setLocationSugestions] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const hasSugestions = locationSugestions.results.length > 0;
  const showButton = searchParam.length > 0;

  const getLocation = async (searchKeyword) => {
    setLocationSugestions({ results: [] });
    setLoading(true);
    const data = await fetchLocation(searchKeyword);
    if (data) {
      setLocationSugestions(data);
    }
    setLoading(false);
  };

  const updateSearchParam = (param) => {
    setSearchParam(param);
  };

  const clearSearch = () => setSearchParam("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      updateLocation(JSON.parse(savedLocation));
    }
  }, []);

  useEffect(() => {
    if (searchParam.length <= 2) {
      setLocationSugestions({ results: [] });
    }
    const fetchTimeout = setTimeout(() => {
      if (searchParam.length > 2) {
        getLocation(searchParam);
      }
    }, 700);

    return () => {
      clearTimeout(fetchTimeout);
    };
  }, [searchParam]);

  const handleLocationUpdate = (id) => {
    const selectedLocation = locationSugestions.results.filter(
      (sugestion) => sugestion.place_id === id
    );
    updateLocation(selectedLocation[0]);
    localStorage.setItem("location", JSON.stringify(selectedLocation[0]));
    clearSearch();
  };

  const sugestionsContent = hasSugestions
    ? locationSugestions.results.map((sugest) => {
        return (
          <li
            key={sugest.place_id}
            id={sugest.place_id}
            className={classes["sugestions-list-item"]}
            onClick={(event) => {
              handleLocationUpdate(event.target.id);
            }}
          >
            {sugest.formatted}
          </li>
        );
      })
    : null;

  return (
    <div className={classes["searchbar-container"]}>
      <div className={classes["search-bar"]}>
        <input
          onChange={(e) => updateSearchParam(e.target.value)}
          value={searchParam}
          type="text"
          placeholder="Search location.."
        />
        {showButton ? (
          <button onClick={clearSearch}>
            <HiX />
          </button>
        ) : (
          <div className={classes["no-button-container"]}></div>
        )}
        <div className={classes["sugestions-container"]}>
          <ul className={classes["sugestions-list"]}>
            {loading ? (
              <li className={classes["sugestions-list-item"]}>
                Loading sugestions...
              </li>
            ) : null}
            {sugestionsContent}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
