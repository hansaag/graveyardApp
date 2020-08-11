import React, { useState, useContext, Fragment } from "react";

import MenuFieldButton from "./MenuFieldButton"
import { GlobalContext } from "../contexts/GlobalContext";

const Fields = ({ fields }) => {
  const { value, setValue } = useContext(GlobalContext);

  const handleOnClick = (item) => {
    setValue((prev) => {
      return { ...prev, field: item };
    });
  };

  const currentFields = fields.map((item, index) => (
    <li className="field-list-item">
      <MenuFieldButton item= {item} index = {index}/>
        
    </li>
  ));

  return (
    <div className="fields-box">
      <ul className="fields-list">{currentFields}</ul>
    </div>
  );
};

export default Fields;
