import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../contexts/GlobalContext";
import {
  cleanActivities,
  findTimeDiff,
  cleanGlobalActivities,
} from "../utilities/JsonActivities";
import { fieldActivities, globalActivities } from "../utilities/GraveyardInfo";
import { chosenConnection } from "../utilities/Connections";

let currentField = "A";

const InfoBox = ({ item }) => {
  const { value, setValue } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  useEffect(() => {
    setValue((prev) => {
      return { ...prev, field: "A" };
    });
    //kanseller tidligere asynkrone kall her

    setRightItems([]);

    try {
      fetch(`${chosenConnection}/graveyards/${value.gy.id}`)
        .then((response) => response.json())
        .then((json) => cleanGlobalActivities(json))
        .then((cleaned) => setRightItems(cleaned));
    } catch (err) {
      console.error(err.message);
    }
  }, [value.gy.id]);

  useEffect(() => {
    try {
      fetch(`${chosenConnection}/fields/${value.gy.id}/${value.field}`)
        .then((response) => response.json())
        .then((json) => cleanActivities(json))
        .then((cleaned) => setItems(cleaned));
      currentField = value.field;
    } catch (err) {
      console.error(err.message);
    }
  }, [value]);

  const showGlobalActivities = globalActivities.map((activity, index) => {
    const timeElapsed = findTimeDiff(rightItems[index]);
    return (
      <li>
        <div>
          <img src={activity.img}></img>
          <p
            className={` ${
              activity.yellow < timeElapsed ? "show-yellow-text" : ""
            }
            ${activity.red < timeElapsed ? "show-red-text" : ""}`}
          >
            {timeElapsed}
            &nbsp;dager
          </p>
        </div>
      </li>
    );
  });

  const getFieldActivies = fieldActivities.map((activity, index) => {
    const timeElapsed = findTimeDiff(items[index]);
    return (
      <div className={`field-activity-${index}`} key={index}>
        <img src={activity.img} alt={`${activity.alt}`}></img>
        <div
          className={`${activity.yellow < timeElapsed ? "show-yellow-text" : ""}
            ${activity.red < timeElapsed ? "show-red-text" : ""}`}
        >
          {timeElapsed}
          &nbsp;dager
        </div>
      </div>
    );
  });

  return (
    <Styled_InfoboxWrapper>
      <div>
        <Styled_FieldGrid>
          <h2> FELT: {currentField}</h2>
          {getFieldActivies}
        </Styled_FieldGrid>
      </div>
      <Styled_GlobalActivities>
        <h2>ALLE FELT</h2>
        <ul>{showGlobalActivities}</ul>
      </Styled_GlobalActivities>
    </Styled_InfoboxWrapper>
  );
};

const Styled_InfoboxWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 96%;
  margin: 0 2% 0 2%;
  padding: 0;
  font-weight: 700;
  min-height: 27.5vh;
  max-height: 29vh;

  & h2 {
    padding: 0;
    margin: 5px 0 0 0;
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.7px;
    word-spacing: 5px;
  }
`;

const Styled_FieldGrid = styled.div`
  width: 60vw;
  max-width: 400px;
  height: 100%;
  border-radius: 10px;
  margin: 0;
  border: 1px solid #486a47;
  background-color: white;

  display: grid;
  grid-template:
    [row1-start] "header header" 10% [row1-end]
    [row2-start] "gaaklipper blomster" 30% [row2-end]
    [row3-start] "sitteklipper hekkesaks" 30% [row3-end]
    [row4-start] "trimmer ljaa" 30% [row4-end]
    / 50% 50%;

  & h2 {
    grid-area: header;
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 0.9em;

    & div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    & img {
      max-height: 4.5vh;
      margin-top: 12%;
    }
  }
  & .field-activity-1 {
    grid-area: gaaklipper;
  }

  & .field-activity-2 {
    grid-area: sitteklipper;
  }

  & .field-activity-3 {
    grid-area: trimmer;
  }

  & .field-activity-4 {
    grid-area: blomster;
  }

  & .field-activity-5 {
    grid-area: hekkesaks;
  }

  & .field-activity-6 {
    grid-area: ljaa;
  }
`;

const Styled_GlobalActivities = styled.div`
  width: 30vw;
  background-color: white;
  max-width: 250px;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  border: 1px solid #486a47;

  & h2 {
    height: 15%
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 85%;

    & div {
      display: flex;
      justify-content: space-evenly;
      font-size: 0.8em;
      word-spacing: 0;

      & img  {
        max-height: 4vh;
      };
      
    };
  }
`;

export default InfoBox;
