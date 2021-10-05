import React, { useState, useContext, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { ActivityViewContext } from "../contexts/ActivityViewContext";
import { CriticalFieldsContext } from "../contexts/CriticalFieldsContext";
import "../stylesheets/menuFieldButton.css"

export const MenuFieldButton = ({ item, index }) => {
  const [active, SetActive] = useState(false);
  const { value, setValue } = useContext(GlobalContext);
  const { criticalDates } = useContext(CriticalFieldsContext);
  const { selectedActivity } = useContext(ActivityViewContext);
  const thisField = value.gy.fields[index];

  const handleOnClick = () => {
    setValue((prev) => {
      return { ...prev, field: item };
    });
  };

  useEffect(() => {
    if (thisField == value.field) {
      SetActive(true);
    } else SetActive(false);
  }, [value.field == thisField || thisField]);

  useEffect(() => {
  }, [criticalDates]);

  if (active)
    return (
      <a
        className={`round-button-menu-active ${
          selectedActivity &&
          criticalDates &&
          criticalDates[index] > selectedActivity.yellow
            ? "show-yellow-button"
            : ""
        } ${
          selectedActivity &&
          criticalDates &&
          criticalDates[index] > selectedActivity.red
            ? "show-red-button"
            : ""
        }`}
        onClick={handleOnClick}
      >
        {thisField}
      </a>
    );
  else
    return (
      <a
        className={`round-button-menu-inactive ${
          selectedActivity &&
          criticalDates &&
          criticalDates[index] > selectedActivity.yellow
            ? "show-yellow-button"
            : ""
        }
        ${
          selectedActivity &&
          criticalDates &&
          criticalDates[index] > selectedActivity.red
            ? "show-red-button"
            : ""
        }`}
        onClick={handleOnClick}
      >
        {thisField}
      </a>
    );
};

export default MenuFieldButton;
