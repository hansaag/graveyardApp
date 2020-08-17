import React, { useState, useContext, Fragment } from "react";

import MenuFieldButton from "./MenuFieldButton";
import { GlobalContext } from "../contexts/GlobalContext";
import { FieldActivities, fieldActivities } from "../utilities/GraveyardInfo";
import { ActivityViewContext } from "../contexts/ActivityViewContext";
import { lightDates } from "../utilities/JsonActivities";

const Fields = ({ fields }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { selectedActivity, setSelectedActivity } = useContext(
    ActivityViewContext
  );
  const [showList, setShowList] = useState(false);

  let fieldTimeList;

  const handleOnClick = (item) => {
    setValue((prev) => {
      return { ...prev, field: item };
    });
  };

  const iconView = () => {
    if (selectedActivity)
      return (
        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          {<img src={selectedActivity ? selectedActivity.img : null} />}
          <div className="remove-activity">Fjern</div>
        </div>
      );
    else
      return (
        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          <p>Velg</p>
          <div className="remove-activity">Fjern</div>
        </div>
      );
  };

  const handleActivitySelectorClick = () => {
    setShowList(!showList);
  };

  const selectActivityClick = (item, index) => {
    setSelectedActivity(item);
    setShowList(false);

    console.log(selectedActivity);

    try {
      fetch(`http://138.68.88.7:5000/fields/${value.gy.id}`)
        .then((res) => res.json())
        .then((items) => lightDates(items, fieldActivities[index].dbValue))
        .then((json) => console.log(json));
    } catch (err) {
      console.error(err.message);
    }
  };

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
          onClick={() => selectActivityClick(item, index)}
        >
          <img src={item.img} />
          <h5>{item.value}</h5>
        </li>
      );
    }
  });
  if (showList) {
    return (
      <div className="fields-box">
        <div
          className={`activity-selector-list-container ${
            showList ? "show-list" : ""
          }`}
        >
          <ul className="activity-selector-list">{activityList}</ul>
        </div>
        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          <div className="activity-selector-icon"></div>
          <img src={selectedActivity ? selectedActivity.img : null} />
          <div
            className={`remove-activity ${selectedActivity ? "show" : ""}`}
            onClick={() => setSelectedActivity(null)}
          >
            Fjern
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="fields-box">
        <ul className="fields-list">{currentFields}</ul>
        <div
          className="activity-selector"
          onClick={handleActivitySelectorClick}
        >
          <h5>Visning</h5>
          <div className="activity-selector-icon"></div>
          <img src={selectedActivity ? selectedActivity.img : null} />
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
