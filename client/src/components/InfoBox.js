import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";
import JsonActivities, { cleanActivities } from "../utilities/JsonActivities";
import { graveyards, weeklyActivities } from "../GraveyardInfo";

const InfoBox = ({ item }) => {
  const { value, setValue } = useContext(GlobalContext);

  const getTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/fields/${value.gy.id}/${value.field}`
      );
      const jsonData = await response.json();
      const list = cleanActivities(jsonData);
      console.log(jsonData);
      return list;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };
  const activityStatus = getTasks();

  const left = weeklyActivities.filter((ele, index) => {
    return index % 2 == 0 && index !== 8;
  });

  const right = weeklyActivities.filter((ele, index) => {
    return index % 2 !== 0 && index !== 8;
  });

  const showActivities1 = left.map((activity) => <li>{activity.value}</li>);

  const showActivities2 = right.map((activity) => <li>{activity.value}</li>);

  return (
    <div className="infobox">
      <div className="infobox-left">
        <h2>FELT: A</h2>
        <div className="infobox-left-items">
          <ul className="infobox-list1">{showActivities1}</ul>
          <ul className="infobox-list2">{showActivities2}</ul>
        </div>
      </div>
      <div className="infobox-right ">
        <h2>ALLE FELT</h2>
        <div className="infobox-right-items">
          <ul className="infobox-list1">{showActivities1}</ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
