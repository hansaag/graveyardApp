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

const Activities = () => {
  const { value, setValue } = useContext(GlobalContext);
  const [activities, setActivities] = useState([]);
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const [buttonIndex, setButtonIndex] = useState(null);

  let projectContainer;

  let currentProjectIndex;

  const getProjectData = useCallback((projArr) => {
    projectContainer = projArr;
    console.log(projectContainer);
    return projArr;
  });

  const toggleProject = (activity, index) => {
    console.log(buttonIndex);

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
    fetch(`http://138.68.88.7:5000/projects/${value.gy.id}`)
      .then((response) => response.json())
      .then((sendData) => getProjectData(sendData))
      .then((cleaned) => setActivities(cleaned));
  }, [value.gy.id]);

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
      <ProjectInfo />
    </div>
  );
};

export default Activities;
