import React, { useState, useContext, useEffect, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";
import JsonActivities, {
  cleanActivities,
  findTimeDiff,
  cleanGlobalActivities,
} from "../utilities/JsonActivities";
import {
  graveyards,
  weeklyActivities,
  globalActivities,
} from "../GraveyardInfo";

//brukes for å time feltskiftet med innlastning

let currentField = "A";

const InfoBox = ({ item }) => {
  const { value, setValue } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  useEffect(() => {
    setValue((prev) => {
      return { ...prev, field: "A" };
    });

    setRightItems([]);

    fetch(`http://localhost:5000/graveyards/${value.gy.id}`)
      .then((response) => response.json())
      .then((json) => cleanGlobalActivities(json))
      .then((cleaned) => setRightItems(cleaned));
  }, [value.gy.id]);

  useEffect(() => {
    fetch(`http://localhost:5000/fields/${value.gy.id}/${value.field}`)
      .then((response) => response.json())
      .then((json) => cleanActivities(json))
      .then((cleaned) => setItems(cleaned));
    currentField = value.field;
  }, [value]);

  // const getTasks = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/fields/${value.gy.id}/${value.field}`
  //     );
  //     const jsonData = await response.json();
  //     const list = cleanActivities(jsonData);
  //     console.log(jsonData);
  //     tasksLoaded = true;
  //     return list;
  //   } catch (err) {
  //     console.error(err.message);
  //     return null;
  //   }
  // };

  const left = weeklyActivities.filter((ele, index) => {
    return index % 2 == 0 && index !== 6;
  });

  const right = weeklyActivities.filter((ele, index) => {
    return index % 2 !== 0 && index !== 6;
  });

  const showGlobalActivities = globalActivities.map((activity, index) => (
    <li>
      <div>
        <img className="global-activity-icon" src={activity.img}></img>
        <pre>
          {findTimeDiff(rightItems[index])}{" "}
          <span className="activity-span">dager</span>
        </pre>
      </div>
    </li>
  ));

  const showActivities1 = left.map((activity, index) => (
    <li className="left-activity-listitem">
      <div>
        <img className="activity-icon" src={activity.img}></img>
        <pre>
          {findTimeDiff(items[index])}{" "}
          <span className="activity-span">dager</span>
        </pre>
      </div>
    </li>
  ));

  const showActivities2 = right.map((activity, index) => (
    <li className="right-activity-listitem">
      <div>
        <img className="activity-icon" src={activity.img}></img>
        <pre>
          {findTimeDiff(items[index + 3])}{" "}
          <span className="activity-span">dager</span>
        </pre>
      </div>
    </li>
  ));

  return (
    <div className="infobox">
      <div className="infobox-left">
        <h2>FELT: {currentField}</h2>
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
