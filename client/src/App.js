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

import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Fields from "./components/Fields";
import InfoBox from "./components/InfoBox";
import Activities from "./components/Activities";
import RegisterWork from "./components/RegisterWork";
import TaskList from "./components/TaskList";
import ProjectInfo from "./components/ProjectInfo";

import { graveyards, weeklyActivities } from "./utilities/GraveyardInfo";

function App() {
    const [value, setValue] = useState({ field: "A", gy: graveyards[1] });
    const providerValue = useMemo(() => ({ value, setValue }), [
        value,
        setValue,
    ]);
    const [edit, setEdit] = useState(false);
    const [allClicked, setAllClicked] = useState(1);
    const [viewProject, setViewProject] = useState(null);
    const [temporaryProgress, setTemporaryProgress] = useState(null);

    const Currentfields = value.gy.fields;

    useEffect(() => {}, [edit]);

    // bør kanskje legge til setMetode på value
    if (!edit) {
        return (
            <GlobalContext.Provider value={providerValue}>
                <ProjectContext.Provider
                    value={{ viewProject, setViewProject }}
                >
                    <ProgressContext.Provider
                        value={{ temporaryProgress, setTemporaryProgress }}
                    >
                        <div className="container">
                            <div className="upper-bar">
                                <Dropdown
                                    title="Velg kirkegård"
                                    items={graveyards}
                                />
                                <GlobalEdit.Provider value={{ edit, setEdit }}>
                                    <RegisterWork />
                                </GlobalEdit.Provider>
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
                    </ProgressContext.Provider>
                </ProjectContext.Provider>
            </GlobalContext.Provider>
        );
    } else
        return (
            <GlobalContext.Provider value={providerValue}>
                <GlobalEdit.Provider value={{ edit, setEdit }}>
                    <div className="input-body">
                        <FieldButtons.Provider
                            value={{ allClicked, setAllClicked }}
                        >
                            <TaskList />
                        </FieldButtons.Provider>
                    </div>
                </GlobalEdit.Provider>
            </GlobalContext.Provider>
        );
}

export default App;
