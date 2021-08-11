import React, {
    useState,
    useContext,
    Fragment,
    useCallback,
    useEffect,
} from "react";
import WorkWindow from "./WorkWindow";
import AddProject from "./AddProject";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";
import { FieldButtons } from "../contexts/FieldButtons";
import { PriorityButtonContext } from "../contexts/PriorityButtonContext";

import {
    graveyards,
    fieldActivities,
    globalActivities,
    extraActivities,
} from "../utilities/GraveyardInfo";

const TaskList = () => {
    const { value, setValue } = useContext(GlobalContext);
    const { edit, setEdit } = useContext(GlobalEdit);
    const { allClicked, setAllClicked } = useContext(FieldButtons);

    const [priorityNum, setPriorityNum] = useState(null);

    const [projectWindow, setProjectWindow] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    const exitDialog = () => {
        if (dialog) {
            setDialog(!dialog);
            setAllClicked(1);
        }
    };

    const setActivity = (activity) => {
        setSelectedActivity(activity);
    };

    const openActivity = useCallback((activity) => {
        setActivity(activity);
        console.log("dialog clicked");
        setDialog(!dialog);
    });

    const openProjects = useCallback(() => {
        setProjectWindow(!projectWindow);
        setPriorityNum(null);
        if (dialog) {
            setDialog(!dialog);
            setAllClicked(1);
        }

        console.log("project clicked");
    });

    const weeklyActivities = fieldActivities.map((activity, index) => (
        <li className="input-activity-listitem" key={index}>
            <div onClick={() => openActivity(activity)}>
                <div className="input-img-holder">
                    <img className="input-img" src={activity.img}></img>
                </div>
                <div className="input-text-holder">
                    <p>{activity.value}</p>
                </div>
            </div>
        </li>
    ));

    const generalActivities = globalActivities.map((activity, index) => (
        <li
            className="input-activity-listitem" key={index}
            onClick={() => openActivity(activity)}
        >
            <div>
                <div className="input-img-holder">
                    <img className="input-img" src={activity.img}></img>
                </div>

                <div className="input-text-holder">
                    <p>{activity.value}</p>
                </div>
            </div>
        </li>
    ));

    const extras = extraActivities.map((activity) => (
        <li
            className="input-activity-listitem"
            onClick={() => openActivity(activity)}
        >
            <div>
                <div className="input-img-holder">
                    <img className="input-img" src={activity.img}></img>
                </div>
                <div className="input-text-holder">
                    <p>{activity.value}</p>
                </div>
            </div>
        </li>
    ));

    useEffect(() => {}, [dialog]);

    return (
        <div
            className={dialog ? "input-container-dimmed" : "input-container"}
            // onClick={() => exitDialog()}
        >
            <div className="input-button-container">
                <div className="extra-activities-button" onClick={openProjects}>
                    Legg til prosjekt
                </div>
                <div className="back-button" onClick={() => toggleEdit()}>
                    Tilbake
                </div>
            </div>
            <PriorityButtonContext.Provider
                value={{ priorityNum, setPriorityNum }}
            >
                <AddProject exit={openProjects} project={projectWindow} />
            </PriorityButtonContext.Provider>

            <WorkWindow
                exit={exitDialog}
                dia={dialog}
                activity={selectedActivity}
            />
            <div className="task-list-title">
                <p>
                    Velg utført aktivitet <span>({value.gy.value})</span>
                </p>
            </div>

            <div className="input-list-container">
                <ul className="input-activity-list">
                    {weeklyActivities}
                    {generalActivities}
                    {extras}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;
