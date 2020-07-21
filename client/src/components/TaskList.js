import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";
import { GlobalEdit } from "../GlobalEdit";
import {
  graveyards,
  weeklyActivities,
  globalActivities,
} from "../GraveyardInfo";

const TaskList = () => {
  const { value, setValue } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalEdit);

  const fieldActivities = weeklyActivities.map((activity) => (
    <li className="input-activity-listitem">
      <div>
        <img className="input-img" src={activity.img}></img>
        <p>{activity.value}</p>
      </div>
    </li>
  ));

  return (
    <div className="input-container">
      <div className="input-button-container">
        <div className="extra-activities-button">
          <p>Legg til prosjekt</p>
        </div>
        <div className="back-button">
          <p>Tilbake</p>
        </div>
      </div>

      <ul className="input-activity-list">{fieldActivities}</ul>
    </div>
  );
};

export default TaskList;
