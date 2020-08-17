import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  memo,
  useCallback,
} from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { FieldActivities, fieldActivities } from "../utilities/GraveyardInfo";
import { ActivityViewContext } from "../contexts/ActivityViewContext";
import { CriticalFieldsContext } from "../contexts/CriticalFieldsContext";

export const MenuFieldButton = ({ item, index }) => {
  const [active, SetActive] = useState(false);
  const { value, setValue } = useContext(GlobalContext);
  const { criticalDates, setCriticalDates } = useContext(CriticalFieldsContext);
  const { selectedActivity, setSelectedActivity } = useContext(
    ActivityViewContext
  );
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
