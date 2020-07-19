import React, { useState, useContext, Fragment } from "react";

import graveyard from "../images/stromso.jpg";

import { GlobalContext } from "../GlobalContext";

const Map = () => {
  const { value, setValue } = useContext(GlobalContext);

  return (
    <div className="map-holder">
      <img class="map-img" src={value.img}></img>
    </div>
  );
};

export default Map;
