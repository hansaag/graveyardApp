import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

const weeklyActivities = [
  {
    id: 1,
    value: "Gåklippet",
    img: null,
  },
  {
    id: 2,
    value: "Sitteklippet",
    img: null,
  },
  {
    id: 3,
    value: "Kantklippet",
    img: null,
  },
  {
    id: 4,
    value: "Vannet",
    img: null,
  },
  {
    id: 5,
    value: "Blomster stelt",
    img: null,
  },
  {
    id: 6,
    value: "Fjernet kvist",
    img: null,
  },
  {
    id: 7,
    value: "Luket graver",
    img: null,
  },
  {
    id: 8,
    value: "Skjegget trær",
    img: null,
  },
  {
    id: 9,
    value: "Begravelse",
    img: null,
  },
];

const InfoBox = () => {
  const { value, setValue } = useContext(GlobalContext);

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
