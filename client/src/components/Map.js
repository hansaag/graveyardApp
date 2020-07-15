import React, { useState, useContext, Fragment } from "react";

import graveyard from "../images/stromso.jpg";
import { GlobalContext } from "../GlobalContext";

const Map = () => {
  const { value, setValue } = useContext(GlobalContext);

  return (
    <div className="map-holder">
      <div className="above-map">
        <h2 className="map-header">{value.value}</h2>
        <div className="go-to-list"></div>
      </div>
      <img class="map-img" src={value.img}></img>
    </div>
  );
};

export default Map;
