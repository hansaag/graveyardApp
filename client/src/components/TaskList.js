import React, {
  useState,
  useContext,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import WorkWindow from "./WorkWindow";

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
  const [dialog, setDialog] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const exitDialog = () => {
    if (edit) setEdit(!edit);
  };

  const openActivity = useCallback(() => {
    console.log("dialog clicked");
    setDialog(!dialog);
  });

  const fieldActivities = weeklyActivities.map((activity, index) => (
    <li className="input-activity-listitem">
      <div onClick={() => openActivity()}>
        <img className="input-img" src={activity.img}></img>
        <p>{activity.value}</p>
      </div>
    </li>
  ));

  const generalActivities = globalActivities.map((activity) => (
    <li className="input-activity-listitem" onClick={() => openActivity()}>
      <div>
        <img className="input-img" src={activity.img}></img>
        <p>{activity.value}</p>
      </div>
    </li>
  ));

  useEffect(() => {}, [dialog]);

  return (
    <div
      className={dialog ? "input-container" : "input-container-dimmed"}
      onclick={() => exitDialog()}
    >
      <div className="input-button-container">
        <div className="extra-activities-button">
          <p>Legg til prosjekt</p>
        </div>
        <div className="back-button" onClick={() => toggleEdit()}>
          <p>Tilbake</p>
        </div>
      </div>
      <WorkWindow open={openActivity} dia={dialog} />

      <ul className="input-activity-list">
        {fieldActivities}
        {generalActivities}
      </ul>
    </div>
  );
};

export default TaskList;
