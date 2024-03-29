import React, { useContext, useEffect } from "react";

import "../stylesheets/workWindow.css";
import { GlobalContext } from "../contexts/GlobalContext";
import { FieldButtons } from "../contexts/FieldButtons";
import { FieldButton } from "./FieldButton";
import { AllFieldsButton } from "./AllFieldsButton";
import { returnDates } from "../utilities/JsonActivities";
import rightArrow from "../images/right-arrow.png";
import leftArrow from "../images/left-arrow.png";
import { chosenConnection } from "../utilities/Connections";

/* this component lets the user register which fields and which
date an activity has been completed on */

const WorkWindow = React.memo(({ exit, dia, activity }) => {
  const { value } = useContext(GlobalContext);
  const { allClicked } = useContext(FieldButtons);

  const fieldCount = value.gy.fields.length;
  const allFields = {
    id: 100,
    value: "ALLE",
  };
  const clickedButtons = Array(fieldCount);

  const handleOnClick = (id) => {
    clickedButtons[id] = !clickedButtons[id];
  };

  const currentFields = value.gy.fields.map((item, index) => (
    <li className="field-list-item" key={index}>
      <FieldButton
        parentClick={() => handleOnClick(index)}
        item={item}
      ></FieldButton>
    </li>
  ));

  const allFieldsButton = (
    <AllFieldsButton name={allFields.value} key="all"></AllFieldsButton>
  );

  currentFields.push(allFieldsButton);
  const refArray = Array(30);
  let currentRef = 0;

  const handleRightClick = () => {
    if (currentRef > 0 && refArray[currentRef - 1] !== null) {
      refArray[currentRef - 1].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      currentRef--;
    }
  };

  const handleLeftClick = () => {
    if (currentRef < 28 && refArray[currentRef + 1] !== null) {
      refArray[currentRef + 1].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      currentRef++;
    }
  };

  const dateArray = returnDates().map((date, index) => {
    const ref = React.createRef();
    refArray[index] = ref;

    return (
      <li
        className="date-list-item"
        ref={ref}
        dbdate={date.dbValue}
        key={index}
      >
        {date.display}
      </li>
    );
  });

  const registerWork = (e) => {
    e.preventDefault();
    let updateArray = [];
    if (allClicked === 2) {
      clickedButtons.fill(true);
    }
    for (let i = 0; i < value.gy.fields.length; i++) {
      if (clickedButtons[i] === true) updateArray.push(value.gy.fields[i]);
    }
    const completedDate = dateArray[currentRef].props.dbdate;
    const dbActivity = activity.dbValue;
    //should do it all in one call
    if (activity.tag === "field") {
      for (let u in updateArray) {
        try {
          const body = { dbActivity, completedDate };

          fetch(`${chosenConnection}/fields/${value.gy.id}/${updateArray[u]}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    } else {
      try {
        const body = { dbActivity, completedDate };

        fetch(`${chosenConnection}/graveyards/${value.gy.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    exit();
  };

  useEffect(() => {}, [dia]);

  if (dia) {
    return (
      <div className="work-window">
        <div className="work-window-img-and-fields">
          <div className="work-window-header">
            <p className="work-window-text">
              Velg felter der det har blitt {activity.value.toLowerCase()}{" "}
            </p>
            <img
              src={activity.img}
              alt={activity.name}
              className="work-window-img"
            ></img>
          </div>
          <div className="work-window-img-holder">
            <img
              src={value.gy.img}
              alt={value.gy.name}
              className="work-window-gy"
            ></img>
          </div>
          <div className="work-window-field-container">
            <ul className="work-window-field-list">{currentFields}</ul>
          </div>
        </div>

        <div className="date-selection-box">
          <div className="date-selection-header">
            <h2>Velg utført dato</h2>
          </div>
          <div className="date-finished-container">
            <img
              src={leftArrow}
              onClick={handleLeftClick}
              className="left-arrow"
              alt="left arrow"
            />

            <ul className="date-list">{dateArray}</ul>
            <img
              src={rightArrow}
              onClick={handleRightClick}
              className="right-arrow"
              alt="right arrow"
            />
          </div>
        </div>
        <div className="work-window-footer">
          <div className="work-window-cancel" onClick={exit}>
            Avbryt
          </div>
          <div className="work-window-register" onClick={registerWork}>
            Registrer
          </div>
        </div>
      </div>
    );
  }
});

export default WorkWindow;
