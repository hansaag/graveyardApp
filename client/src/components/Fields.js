import React, { useState, useContext, Fragment } from "react";

import MenuFieldButton from "./MenuFieldButton";
import { GlobalContext } from "../contexts/GlobalContext";
import { FieldActivities, fieldActivities } from "../utilities/GraveyardInfo";
import { ActivityViewContext } from "../contexts/ActivityViewContext";

const Fields = ({ fields }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { selectedActivity, setSelectedActivity } = useContext(
    ActivityViewContext
  );
  const [showList, setShowList] = useState(false);

  const handleOnClick = (item) => {
    setValue((prev) => {
      return { ...prev, field: item };
    });
  };

  const handleActivitySelectorClick = () => {
    setShowList(!showList);
  };

  const currentFields = fields.map((item, index) => (
    <li className="field-list-item">
      <MenuFieldButton item={item} index={index} />
    </li>
  ));

  const activityList = fieldActivities.map((item, index) => {
    if (index < 5) {
      return (
        <li className="activity-selector-li">
          <img src={item.img} />
          <h5>{item.value}</h5>
        </li>
      );
    }
  });

  return (
    <div className="fields-box">
      <ul className="fields-list">{currentFields}</ul>
      <div className="activity-selector" onClick={handleActivitySelectorClick}>
        <h5>Visning</h5>
        <div className="activity-selector-icon"></div>
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
