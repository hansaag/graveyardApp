import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

export const FieldButton = () => {
  const [active, SetActive] = useState(false);

  const toggle = () => {
    SetActive(true);
  };

  if (active)
    return <div className=".round-button-work-active" onClick={toggle}></div>;
  else
    return <div className=".round-button-work-inactive" onClick={toggle}></div>;
};
