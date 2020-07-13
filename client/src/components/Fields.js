import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

const Fields = ({ items }) => {
  const handleOnClick = () => {};
  const { value, setValue } = useContext(GlobalContext);
  const id = value.id;
  const dummies = ["A", "B", "C", "D"];
  const fields = dummies.map((item) => <li>{item}</li>);

  return (
    <div>
      <ul>{fields}</ul>
    </div>
  );
};

export default Fields;
