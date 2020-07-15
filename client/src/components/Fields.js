import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

const dummies = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];

const Fields = ({ fields }) => {
  const handleOnClick = () => {};
  const { value, setValue } = useContext(GlobalContext);
  const id = value.id;
  const currentFields = fields.map((item) => (
    <li className="field-list-item">
      <a className="round-button">{item}</a>
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
