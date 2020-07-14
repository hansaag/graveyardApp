import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

const Fields = ({ items }) => {
  const handleOnClick = () => {};
  const { value, setValue } = useContext(GlobalContext);
  const id = value.id;
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
  const fields = dummies.map((item) => (
    <li className="field-list-item">
      <a className="round-button">{item}</a>
    </li>
  ));

  return (
    <div className="fields-box">
      <ul className="fields-list">{fields}</ul>
    </div>
  );
};

export default Fields;
