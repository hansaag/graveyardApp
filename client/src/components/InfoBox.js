import React, { useState, useContext, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import {
  cleanActivities,
  findTimeDiff,
  cleanGlobalActivities,
} from "../utilities/JsonActivities";
import {
  fieldActivities,
  globalActivities,
} from "../utilities/GraveyardInfo";
import { chosenConnection } from "../utilities/Connections";


let currentField = "A";

const InfoBox = ({ item }) => {
  const { value, setValue } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  useEffect(() => {
    setValue((prev) => {
      return { ...prev, field: "A" };
    });
    //kanseller tidligere asynkrone kall her

    setRightItems([]);

    fetch(`${chosenConnection}/graveyards/${value.gy.id}`)
      .then((response) => response.json())
      .then((json) => cleanGlobalActivities(json))
      .then((cleaned) => setRightItems(cleaned));
  }, [value.gy.id]);

  useEffect(() => {
    fetch(`${chosenConnection}/fields/${value.gy.id}/${value.field}`)
      .then((response) => response.json())
      .then((json) => cleanActivities(json))
      .then((cleaned) => setItems(cleaned));
    currentField = value.field;
  }, [value]);



  const left = fieldActivities.filter((ele, index) => {
    return index < 3;
  });

  const right = fieldActivities.filter((ele, index) => {
    return index > 2 && index < 6;
  });

  const showGlobalActivities = globalActivities.map((activity, index) => {
    const timeElapsed = findTimeDiff(rightItems[index]);
    return (
      <li>
        <div>
          <img className="global-activity-icon" src={activity.img}></img>
          <pre
            className={`infobox-status-text ${
              activity.yellow < timeElapsed ? "show-yellow-text" : ""
            }
            ${activity.red < timeElapsed ? "show-red-text" : ""}`}
          >
            {timeElapsed}
            &nbsp;dager
          </pre>
        </div>
      </li>
    );
  });

  const showActivities1 = left.map((activity, index) => {
    const timeElapsed = findTimeDiff(items[index]);
    return (
      <li className="left-activity-listitem">
        <div>
          <img className="activity-icon" src={activity.img}></img>
          <pre
            className={`infobox-status-text ${
              activity.yellow < timeElapsed ? "show-yellow-text" : ""
            }
            ${activity.red < timeElapsed ? "show-red-text" : ""}`}
          >
            {timeElapsed}
            &nbsp;dager
          </pre>
        </div>
      </li>
    );
  });

  const showActivities2 = right.map((activity, index) => {
    const timeElapsed = findTimeDiff(items[index + 3]);
    return (
      <li className="right-activity-listitem">
        <div>
          <img className="activity-icon" src={activity.img}></img>
          <pre
            className={`infobox-status-text ${
              activity.yellow < timeElapsed ? "show-yellow-text" : ""
            }
            ${activity.red < timeElapsed ? "show-red-text" : ""}`}
          >
            {timeElapsed}
            &nbsp;dager
          </pre>
        </div>
      </li>
    );
  });

  return (
    <div className="infobox">
      <div className="infobox-left">
        <h2> FELT: {currentField}</h2>
        <div className="infobox-left-items">
          <ul className="infobox-list1">{showActivities1}</ul>
          <ul className="infobox-list2">{showActivities2}</ul>
        </div>
      </div>
      <div className="infobox-right ">
        <h2>ALLE FELT</h2>
        <div className="infobox-right-items">
          <ul className="infobox-list3">{showGlobalActivities}</ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
