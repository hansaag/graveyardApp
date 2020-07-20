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
import RegisterWork from "./components/RegisterWork";

import { graveyards, weeklyActivities } from "./GraveyardInfo";

function App() {
  const [value, setValue] = useState({ field: "A", gy: graveyards[1] });
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  const Currentfields = value.gy.fields;

  return (
    <GlobalContext.Provider value={providerValue}>
      <div className="container">
        <div className="upper-bar">
          <Dropdown title="Velg kirkegård" items={graveyards} />
          <RegisterWork />
        </div>

        <Map />
        <div className="gy-holder">
          <Fields fields={Currentfields} />
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
