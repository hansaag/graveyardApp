import React, {
  Fragment,
  useState,
  useContext,
  useMemo,
  useEffect,
  createContext,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { GlobalContext } from "./contexts/GlobalContext";
import { GlobalEdit } from "./contexts/GlobalEdit";
import { FieldButtons } from "./contexts/FieldButtons";
import { ProjectContext } from "./contexts/ProjectContext";
import { ProgressContext } from "./contexts/ProgressContext";
import { ActivityViewContext } from "./contexts/ActivityViewContext";
import { UserContext } from "./contexts/UserContext";

import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Fields from "./components/Fields";
import InfoBox from "./components/InfoBox";
import Activities from "./components/Activities";
import RegisterWork from "./components/RegisterWork";
import TaskList from "./components/TaskList";
import LoginPortal from "./components/LoginPortal";

import { graveyards, weeklyActivities } from "./utilities/GraveyardInfo";
import { chosenConnection } from "./utilities/Connections";
import { sommerHjelp, fastAnsatt } from "./utilities/AccessStrings";

function App() {
  const [authenticated, setAuthenticated] = useState(1); //set to 0 to activate login
  const [value, setValue] = useState({ field: "A", gy: graveyards[1] });
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);
  const [edit, setEdit] = useState(false);
  const [allClicked, setAllClicked] = useState(1);
  const [viewProject, setViewProject] = useState(null);
  const [temporaryProgress, setTemporaryProgress] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const Currentfields = value.gy.fields;

  useEffect(() => {}, [edit]);
  useEffect(() => {}, [authenticated]);

  if (authenticated === 0) {
    return (
      <UserContext.Provider value={{ authenticated, setAuthenticated }}>
        <LoginPortal />
      </UserContext.Provider>
    );
  } else {
    if (!edit) {
      return (
        <UserContext.Provider value={authenticated}>
          <GlobalContext.Provider value={providerValue}>
            <ProjectContext.Provider value={{ viewProject, setViewProject }}>
              <ProgressContext.Provider
                value={{ temporaryProgress, setTemporaryProgress }}
              >
                <ActivityViewContext.Provider
                  value={{ selectedActivity, setSelectedActivity }}
                >
                  <GlobalEdit.Provider value={{ edit, setEdit }}>
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
                  </GlobalEdit.Provider>
                </ActivityViewContext.Provider>
              </ProgressContext.Provider>
            </ProjectContext.Provider>
          </GlobalContext.Provider>
        </UserContext.Provider>
      );
    } else
      return (
        <UserContext.Provider value={authenticated}>
          <GlobalContext.Provider value={providerValue}>
            <GlobalEdit.Provider value={{ edit, setEdit }}>
              <div className="input-body">
                <FieldButtons.Provider value={{ allClicked, setAllClicked }}>
                  <TaskList />
                </FieldButtons.Provider>
              </div>
            </GlobalEdit.Provider>
          </GlobalContext.Provider>
        </UserContext.Provider>
      );
  }
}

export default App;
