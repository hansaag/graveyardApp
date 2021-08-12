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
  const [showActivityList, setshowActivityList] = useState(false);
  const [criticalDates, setCriticalDates] = useState([]);

  const setDates = (items) => {
    setCriticalDates(items);
  };

  const handleActivitySelectorClick = () => {
    setshowActivityList(!showActivityList);
  };

  const selectActivityClick = async (item, name) => {
    setSelectedActivity(item);
    setshowActivityList(false);

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
    setshowActivityList(false);
    setSelectedActivity(null);
    setCriticalDates([]);
  }, [edit]);

  const currentFields = fields.map((item, index) => (
    <li>
      <MenuFieldButton item={item} index={index} />
    </li>
  ));

  const activityList = fieldActivities.map((item, index) => {
    if (index < 6) {
      return (
        <li
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

  const activitySelectorIcon = () => {
    if (showActivityList) {
      return (
        <div onClick={() => setSelectedActivity(null)}>
          <img src={trash} />
        </div>
      );
    } else {
      if (selectedActivity)
        return (
          <div>
            <img src={selectedActivity.img} />
          </div>
        );
      else return <icon>+</icon>;
    }
  };

  return (
    <Styled_FieldWrapper>
      <CriticalFieldsContext.Provider
        value={{ criticalDates, setCriticalDates }}
      >
        {showActivityList ? (
          <Styled_ActivityList>{activityList}</Styled_ActivityList>
        ) : (
          <Styled_FieldList>{currentFields}</Styled_FieldList>
        )}
      </CriticalFieldsContext.Provider>

      <Styled_ActivitySelector onClick={handleActivitySelectorClick}>
        <h5>Visning</h5>
        {activitySelectorIcon()}
      </Styled_ActivitySelector>
    </Styled_FieldWrapper>
  );
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

  & li {
    text-align: center;
    display: flex;
    margin: 0.5vh 0 0 1.2vw;
  }
`;
const Styled_ActivityList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  width: 100%;

  & li {
    background: white;
    border-radius: 10px;
    width: 12vw;
    max-width: 65px;
    height: 5.5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.2vh 0 0.5vh 2vw;
    font-size: 0.65em;
    box-shadow: 1px 1px 3px black;

    & img {
      height: 80%;
      max-height: 40px;
      margin: 0.5vh 1vw auto 2vw;
    };
  };
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

  & div {
    height: 6vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    & img {
      max-height: 65%;
      margin-top: 7px;
      margin-bottom: 0;
    }
  }

  & icon {
    font-size: 4em;
    color: black;
    line-height: 25px;
    margin: 0 auto;
    margin-top: 7px;
  }
`;

export default Fields;
