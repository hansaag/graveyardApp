import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  useMemo,
} from "react";

import { GlobalContext } from "../GlobalContext";
import { GlobalEdit } from "../GlobalEdit";

const WorkWindow = React.memo(({ exit, dia, activity }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalEdit);
  const [clicked, setClicked] = useState();

  const fieldCount = value.gy.fields.length;

  const clickedButtons = Array(fieldCount);

  const handleOnClick = (id) => {
    console.log(id);
    clickedButtons[id] = !clickedButtons[id];
    console.log(clickedButtons);
  };

  const currentFields = value.gy.fields.map((item, index) => (
    <li className="field-list-item">
      <a
        className="round-button-work"
        onClick={() => handleOnClick(index)}
        index={index}
      >
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
            Velg felter der det har blitt {activity.value.toLowerCase()}
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
