import React, {
  useState,
  useContext,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { ProjectContext } from "../contexts/ProjectContext";

import JsonActivities, { cleanProjects } from "../utilities/JsonActivities";
import ProjectInfo from "./ProjectInfo";
import { GlobalEdit } from "../contexts/GlobalEdit";
import { chosenConnection } from "../utilities/Connections";

const Activities = () => {
  const { value, setValue } = useContext(GlobalContext);
  const [activities, setActivities] = useState([]);
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const [buttonIndex, setButtonIndex] = useState(null);
  const { edit, setEdit } = useContext(GlobalEdit);

  let projectContainer;

  let currentProjectIndex;

  const getProjectData = useCallback((projArr) => {
    projectContainer = projArr;
    console.log(projectContainer);
    return projArr;
  });

  const updateLocalProjectValue = useCallback((item, value) => {
    item["percent_finished"] = value;
    console.log(item);
  });

  const toggleProject = (activity, index) => {
    console.log(activity);
    if (activity != viewProject) {
      setViewProject(activity);
      setButtonIndex(index);
    } else {
      setViewProject(null);
      setButtonIndex(null);
    }
  };

  useEffect(() => {
    fetch(`${chosenConnection}/projects/${value.gy.id}`)
      .then((response) => response.json())
      .then((sendData) => getProjectData(sendData))
      .then((cleaned) => setActivities(cleaned));
  }, [value.gy.id || edit]);

  const fields = activities.map((item, index) => (
    <li
      className={`activity-list-item ${
        buttonIndex == index ? "highlight-activity" : ""
      }`}
      onClick={() => toggleProject(activities[index], index)}
      key={index}
    >
      <a className="activity">{item.project_title}</a>
    </li>
  ));

  return (
    <div classname="activity-holder">
      <ul className="activity-list">{fields}</ul>
      <ProjectInfo
        updateLocalProjectValue={updateLocalProjectValue}
        index={buttonIndex}
      />
    </div>
  );
};

export default Activities;
