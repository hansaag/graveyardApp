import React, { Fragment, useState, useContext, useMemo } from "react";
import ReactDOM from "react-dom";
import "./App.css";

import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import { GlobalContext } from "./GlobalContext";

import stromsoImg from "./images/stromso2.jpg";
import dummy from "./images/world-map-detailed.jpg";

const graveyards = [
  {
    id: 1,
    value: "Strømsø",
    img: stromsoImg,
  },
  {
    id: 2,
    value: "Bragernes",
    img: dummy,
  },
  {
    id: 3,
    value: "Strømsgodset",
    img: dummy,
  },
  {
    id: 4,
    value: "Konnerud",
    img: dummy,
  },
];

function App() {
  const graveyard = dummy;
  const [value, setValue] = useState(dummy);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Fragment>
      <div>
        <GlobalContext.Provider value={providerValue}>
          <div className="container">
            <h1 className="title-text">Viken Kirkegårder</h1>
            <Dropdown title="Velg kirkegård" items={graveyards} />
            <div>
              <Map />
            </div>
          </div>
        </GlobalContext.Provider>
      </div>
    </Fragment>
  );
}

export default App;
