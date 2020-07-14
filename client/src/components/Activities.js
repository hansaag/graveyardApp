import React, { useState, useContext, Fragment } from "react";
import { GlobalContext } from "../GlobalContext";

const Activities = () => {
  const { value, setValue } = useContext(GlobalContext);

  const activities = ["Luke A-feltet", "Grave ned slange"];
  const fields = activities.map((item) => (
    <li className="activity-list-item">
      <a className="activity">{item}</a>
    </li>
  ));

  return (
    <div classname="activity-holder">
      <ul className="activity-list">{fields}</ul>
    </div>
  );
};

export default Activities;
