import React, { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "../contexts/GlobalContext";

const Map = () => {
  const { value } = useContext(GlobalContext);

  return (
    <StyledMap className="map-holder">
      <img src={value.gy.img} alt={value.gy.name}></img>
    </StyledMap>
  );
};

const StyledMap = styled.div`
  width: 94%;

  & img {
    max-height: 35vh;
    min-height: 15vh;
    max-width: 100%;
    margin: 0.5vh 0 1.5vh 0;
    border-radius: 10px;
    
  }
`;

export default Map;
