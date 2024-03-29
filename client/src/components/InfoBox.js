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
      <li key={index}>
        <div>
          <img src={activity.img} alt={activity.name}></img>
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
    <StyledInfoboxWrapper>
      <div>
        <StyledFieldGrid>
          <h2> FELT: {currentField}</h2>
          {getFieldActivies}
        </StyledFieldGrid>
      </div>
      <StyledGlobalActivities>
        <h2>ALLE FELT</h2>
        <ul>{showGlobalActivities}</ul>
      </StyledGlobalActivities>
    </StyledInfoboxWrapper>
  );
};

const StyledInfoboxWrapper = styled.div`
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

const StyledFieldGrid = styled.div`
  width: 60vw;
  max-width: 400px;
  height: 100%;
  border-radius: 10px;
  margin: 0;
  border: 1px solid #486a47;
  background-color: white;

  display: grid;
  grid-template:
    "header header" 10%
    "gaaklipper blomster" 30%
    "sitteklipper hekkesaks" 30%
    "trimmer ljaa" 30%
    / 50% 50%;

  & h2 {
    grid-area: header;
    font-size: 0.8rem;
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

const StyledGlobalActivities = styled.div`
  width: 30vw;
  background-color: white;
  max-width: 250px;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  border: 1px solid #486a47;

  & h2 {
    height: 15%;
    font-size: 0.8rem;
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
