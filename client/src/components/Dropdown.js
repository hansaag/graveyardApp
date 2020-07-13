import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";
import Map from "./Map";
import church from "../images/church.png";

export const Dropdown = ({ title, items, multiSelect = false }) => {
  const { value, setValue } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const handleOnClick = (item) => {
    toggle(!open);
    console.log(item);
    setValue(item);
  };

  // sort by user location and show distance?
  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header_title">
          <p className="dd-header_title--bold">{title}</p>
          <img className="church" src={church}></img>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button
                className="dd-button"
                type="button"
                onClick={() => handleOnClick(item)}
              >
                <span>{item.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
