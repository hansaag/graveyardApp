import React, { useState, useContext, useEffect, Fragment } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import JsonActivities, {
  cleanActivities,
  findTimeDiff,
  cleanGlobalActivities,
} from "../utilities/JsonActivities";
import {
  graveyards,
  fieldActivities,
  globalActivities,
} from "../utilities/GraveyardInfo";

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
    //kanseller tidligere asynkrone kall her

    setRightItems([]);

    fetch(`http://138.68.88.7:5000/graveyards/${value.gy.id}`)
      .then((response) => response.json())
      .then((json) => cleanGlobalActivities(json))
      .then((cleaned) => setRightItems(cleaned));
  }, [value.gy.id]);

  useEffect(() => {
    fetch(`http://138.68.88.7:5000/fields/${value.gy.id}/${value.field}`)
      .then((response) => response.json())
      .then((json) => cleanActivities(json))
      .then((cleaned) => setItems(cleaned));
    currentField = value.field;
    console.log(items);
  }, [value]);

  // index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  // in InfoBox (at App.js:47)
  // in div (at App.js:45)
  // in div (at App.js:36)   ***ved spamming av felter***

  const left = fieldActivities.filter((ele, index) => {
    return index < 3;
  });

  const right = fieldActivities.filter((ele, index) => {
    return index > 2 && index < 6;
  });

  const showGlobalActivities = globalActivities.map((activity, index) => (
    <li>
      <div>
        <img className="global-activity-icon" src={activity.img}></img>
        <pre>
          {findTimeDiff(rightItems[index])}{" "}
          dager
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
          dager
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
          dager
        </pre>
      </div>
    </li>
  ));

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
