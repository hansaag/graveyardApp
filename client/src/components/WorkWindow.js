import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  useMemo,
} from "react";

import { GlobalContext } from "../GlobalContext";
import { GlobalEdit } from "../GlobalEdit";

const WorkWindow = React.memo(({ openActivity, dia, activity }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalEdit);

  const handleOnClick = () => {};

  const currentFields = value.gy.fields.map((item) => (
    <li className="field-list-item">
      <a className="round-button-work" onClick={() => handleOnClick(item)}>
        {item}
      </a>
    </li>
  ));

  useEffect(() => {}, [dia]);

  if (dia) {
    return (
      <div className="work-window">
        <div className="work-window-header">
          <p className="work-window-text">
            Velg felter der det har blitt {activity.value.toLowerCase()}:
          </p>
          <img src={activity.img} className="work-window-img"></img>
        </div>
        <div className="work-window-field-container">
          <ul className="work-window-field-list">{currentFields}</ul>
        </div>
        <div className="work-window-footer">
          <div className="work-window-cancel">Avbryt</div>
          <div className="work-window-register">Registrer</div>
        </div>
      </div>
    );
  } else {
    return <div className="work-window-invis"></div>;
  }
});

export default WorkWindow;
