import React, {
  Fragment,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { GlobalContext } from "./GlobalContext";

import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Fields from "./components/Fields";
import InfoBox from "./components/InfoBox";
import Activities from "./components/Activities";

import stromsoImg from "./images/stromso2.jpg";
import bragernesImg from "./images/bragernes.png";
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
    img: bragernesImg,
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

const getFields = async ({ value }) => {
  try {
    const id = value.id;
    const response = await fetch(`http://localhost:5000/graveyards/${id}`);
    const jsonData = await response.json();
    console.log(jsonData);

    return jsonData;
  } catch (err) {
    console.error(err.message);
  }
};

function App() {
  const [value, setValue] = useState(graveyards[1]);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  let gyMap = providerValue.img;

  // if (value != dummy) {
  //   fields = getFields(value);
  // }

  let fieldsResp;
  if (value !== graveyards[1]) {
    fieldsResp = getFields(value);
  }

  return (
    <GlobalContext.Provider value={providerValue}>
      <div className="container">
        <h1 className="title-text">Drammen kommune</h1>
        <Dropdown title="Velg kirkegård" items={graveyards} />
        <div className="gy-holder">
          <Map />
          <Fields fieldsResp />
          <InfoBox />
        </div>
      </div>
      <div className="activity-box">
        <Activities />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
