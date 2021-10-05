import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { ProjectContext } from "../contexts/ProjectContext";
import styled from "styled-components";
import ProjectInfo from "./ProjectInfo";
import { GlobalEdit } from "../contexts/GlobalEdit";
import { chosenConnection } from "../utilities/Connections";
import "../stylesheets/activities.css"

const Activities = () => {
  const { value } = useContext(GlobalContext);
  const [activities, setActivities] = useState([]);
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const [buttonIndex, setButtonIndex] = useState(null);
  const { edit } = useContext(GlobalEdit);


  const updateLocalProjectValue = ((item, value) => {
    item["percent_finished"] = value;
  });

  const toggleProject = (activity, index) => {
    if (activity !== viewProject) {
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
      .then((json) => setActivities(json));
  }, [value.gy.id || edit]);

  const projects = activities.map((item, index) => (
    <li
      className={`activity-list-item ${
        buttonIndex === index ? "highlight-activity" : ""
      }`}
      onClick={() => toggleProject(activities[index], index)}
      key={index}
    >
      <p className="activity">{item.project_title}</p>
    </li>
  ));

  return (
    <StyledProjectListContainer>
      <ul id="project-list">{projects}</ul>
      <ProjectInfo
        updateLocalProjectValue={updateLocalProjectValue}
        index={buttonIndex}
      />
    </StyledProjectListContainer>
  );
};

const StyledProjectListContainer = styled.div`
  height: 100%;
  width: 100%;

  #project-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    max-width: 700px;
    padding: 0;
    margin: 0 auto;
    vertical-align: middle;
    overflow-x: auto;
 
    & li {
      padding: 5px;
    }
  }
`;

export default Activities;
