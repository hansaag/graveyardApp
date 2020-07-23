import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  useMemo,
} from "react";

import { GlobalContext } from "../GlobalContext";
import { GlobalEdit } from "../GlobalEdit";
import { FieldButtons } from "../contexts/FieldButtons";
import TaskList from "./TaskList";
import { FieldButton } from "./FieldButton";
import { render } from "@testing-library/react";

const WorkWindow = React.memo(({ exit, dia, activity }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalEdit);
  const { allClicked, setAllClicked } = useContext(FieldButtons);

  const fieldCount = value.gy.fields.length;
  const allFields = {
    id: 100,
    value: "ALLE",
  };
  const clickedButtons = Array(fieldCount);

  const handleOnClick = (id) => {
    console.log(id);
    clickedButtons[id] = !clickedButtons[id];
    console.log(clickedButtons);
  };

  const handleAllClick = () => {
    console.log(allClicked);
    setAllClicked(!allClicked);
    console.log(allClicked);
    render(allFieldsButton);
  };

  const currentFields = value.gy.fields.map((item, index) => (
    <li className="field-list-item" onClick={() => handleOnClick(index)}>
      <FieldButton index={index} item={item}></FieldButton>
    </li>
  ));

  const allFieldsButton = (
    <a
      className={!allClicked ? "all-fields-button" : "all-fields-button-active"}
      onClick={() => handleAllClick()}
    >
      {allFields.value}
    </a>
  );

  currentFields.push(allFieldsButton);

  useEffect(() => {}, [dia]);

  if (dia) {
    return (
      <div className="work-window">
        <div className="work-window-header">
          <p className="work-window-text">
            Velg felter der det har blitt {activity.value.toLowerCase()}{" "}
          </p>
          <img src={activity.img} className="work-window-img"></img>
        </div>
        <div className="work-window-field-container">
          <ul className="work-window-field-list">{currentFields}</ul>
        </div>
        <div className="work-window-footer">
          <div className="work-window-cancel" onClick={exit}>
            Avbryt
          </div>
          <div className="work-window-register">Registrer</div>
        </div>
      </div>
    );
  } else {
    return <div className="work-window-invis"></div>;
  }
});

export default WorkWindow;
