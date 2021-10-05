import React, { useEffect, useContext } from "react";
import { PriorityButtonContext } from "../contexts/PriorityButtonContext";
import "../stylesheets/priorityButton.css"
export const PriorityButton = ({ pos }) => {
  const { priorityNum, setPriorityNum } = useContext(PriorityButtonContext);
  const setActive = () => {
    setPriorityNum(pos);
  };

  useEffect(() => {}, [priorityNum]);
  if (priorityNum === pos) {
    return (
      <div className="priority-button-active" onClick={setActive}>
        {pos}
      </div>
    );
  } else
    return (
      <div className="priority-button" onClick={setActive}>
        {pos}
      </div>
    );
};

export default PriorityButton;
