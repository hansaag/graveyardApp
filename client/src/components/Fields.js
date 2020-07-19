import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

const Fields = ({ fields }) => {
  const { value, setValue } = useContext(GlobalContext);

  const handleOnClick = (item) => {
    setValue((prev) => {
      return { ...prev, field: item };
    });
  };

  const currentFields = fields.map((item) => (
    <li className="field-list-item">
      <a className="round-button" onClick={() => handleOnClick(item)}>
        {item}
      </a>
    </li>
  ));
  console.log(currentFields);

  return (
    <div className="fields-box">
      <ul className="fields-list">{currentFields}</ul>
    </div>
  );
};

export default Fields;
