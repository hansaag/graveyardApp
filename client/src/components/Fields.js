import React, { useState, useContext, Fragment, useEffect } from "react";

import MenuFieldButton from "./MenuFieldButton";
import { GlobalContext } from "../contexts/GlobalContext";
import { fieldActivities } from "../utilities/GraveyardInfo";
import { ActivityViewContext } from "../contexts/ActivityViewContext";
import { CriticalFieldsContext } from "../contexts/CriticalFieldsContext";
import { GlobalEdit } from "../contexts/GlobalEdit";
import { lightDates } from "../utilities/JsonActivities";
import { chosenConnection } from "../utilities/Connections";

import trash from "../images/bin.png";

const Fields = ({ fields }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { selectedActivity, setSelectedActivity } =
    useContext(ActivityViewContext);

  const { edit, setEdit } = useContext(GlobalEdit);
  const [showList, setShowList] = useState(false);
  const [criticalDates, setCriticalDates] = useState([]);

  const setDates = (items) => {
    setCriticalDates(items);
  };

  const handleActivitySelectorClick = () => {
    setShowList(!showList);
  };

  const selectActivityClick = async (item, name) => {
    setSelectedActivity(item);
    setShowList(false);

    try {
      await fetch(`${chosenConnection}/fields/${value.gy.id}`)
        .then((res) => res.json())
        .then((items) => lightDates(items, name))
        .then((items) => setDates(items));

    } catch (err) {
      console.error(err.message);
    }
  };
  

  useEffect(() => {
    setShowList(false);
    setSelectedActivity(null);
    setCriticalDates([]);
  }, [edit]);

  const currentFields = fields.map((item, index) => (
    <li className="field-list-item">
      <MenuFieldButton item={item} index={index} />
    </li>
  ));

  const activityList = fieldActivities.map((item, index) => {
    if (index < 6) {
      return (
        <li
          className="activity-selector-li"
          key={index}
          onClick={() =>
            selectActivityClick(item, fieldActivities[index].dbValue)
          }
        >
          <img src={item.img} />
        </li>
      );
    }
  });

  /* if a user has toggled the 'visning' box to show a list of different
  activities for each field */

  if (showList) {
    return (
      <div className="fields-box">
        <div
          className={`activity-selector-list-container ${
            showList ? "show-list" : ""
          }`}
        >
          <CriticalFieldsContext.Provider
            value={{ criticalDates, setCriticalDates }}
          >
            <ul className="activity-selector-list">{activityList}</ul>
          </CriticalFieldsContext.Provider>
        </div>
        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          <div
            className={`remove-activity ${selectedActivity ? "show" : ""}`}
            onClick={() => setSelectedActivity(null)}
          >
            <img className="remove-activity-img" src={trash} />{" "}
          </div>
        </div>
      </div>
    );

  /* if no specific activity is selected and the user has not toggled
  the 'visning' box */
  
  } else if (!selectedActivity && !showList) {
    return (
      <div className="fields-box">
        <CriticalFieldsContext.Provider
          value={{ criticalDates, setCriticalDates }}
        >
          <ul className="fields-list">{currentFields}</ul>
        </CriticalFieldsContext.Provider>

        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          <div className="activity-selector-icon-empty">+</div>
        </div>
        <div
          className={`activity-selector-list-container ${
            showList ? "show-list" : ""
          }`}
        >
          <ul className="activity-selector-list">{activityList}</ul>
        </div>
      </div>
    );

  /* if a user has selected an activity, the 'visning' box should
  reflect that activity and fields should be colored by completed 
  date of the activity */
  
  } else
    return (
      <div className="fields-box">
        <CriticalFieldsContext.Provider
          value={{ criticalDates, setCriticalDates }}
        >
          <ul className="fields-list">{currentFields}</ul>
        </CriticalFieldsContext.Provider>

        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          <div className="activity-selector-icon">
            <img src={selectedActivity ? selectedActivity.img : null} />
          </div>
        </div>

        <div
          className={`activity-selector-list-container ${
            showList ? "show-list" : ""
          }`}
        >
          <ul className="activity-selector-list">{activityList}</ul>
        </div>
      </div>
    );
};

export default Fields;
