import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
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
      <Styled_FieldWrapper>
        <CriticalFieldsContext.Provider
          value={{ criticalDates, setCriticalDates }}
        >
          <Styled_ActivityList>{activityList}</Styled_ActivityList>
        </CriticalFieldsContext.Provider>

        <Styled_ActivitySelector onClick={handleActivitySelectorClick}>
          <h5>Visning</h5>
          <div
            className={`remove-activity ${selectedActivity ? "show" : ""}`}
            onClick={() => setSelectedActivity(null)}
          >
            <img className="remove-activity-img" src={trash} />{" "}
          </div>
        </Styled_ActivitySelector>
      </Styled_FieldWrapper>
    );

    /* if user has selected an activity or is not in the process of selecting one*/
  } else {
    return (
      <Styled_FieldWrapper>
        <CriticalFieldsContext.Provider
          value={{ criticalDates, setCriticalDates }}
        >
          <Styled_FieldList>{currentFields}</Styled_FieldList>
        </CriticalFieldsContext.Provider>

        <Styled_ActivitySelector onClick={handleActivitySelectorClick}>
          <h5>Visning</h5>
          {selectedActivity ? (
            <div className="activity-selector-icon">
              <img src={selectedActivity ? selectedActivity.img : null} />
            </div>
          ) : (
            <div className="activity-selector-icon-empty">+</div>
          )}
        </Styled_ActivitySelector>
        <div
          className={`activity-selector-list-container ${
            showList ? "show-list" : ""
          }`}
        >
          <Styled_ActivityList>{activityList}</Styled_ActivityList>
        </div>
      </Styled_FieldWrapper>
    );
  }
};

const Styled_FieldWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1vh;
`;

const Styled_FieldList = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: flex-start;
  padding: 0;
  flex-wrap: wrap;
  margin: 0;
  width: 85%;
`;
const Styled_ActivityList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  width: 100%;
`;

const Styled_ActivitySelector = styled.div`
  height: 60px;
  font-size: 0.8em;
  width: 15%;
  margin: 0.5vh 3vw 1.5vh 1.5vw;
  background: white;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  box-shadow: 1px 0.5px 4px rgba(0, 0, 0, 1);

  & h5 {
    padding: 5px 5px 0 5px;
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

export default Fields;
