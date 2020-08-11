import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";
import Comments from "./Comments";

const ProjectInfo = ({ toggleProject }) => {
  let newComment;
  const { value, setValue } = useContext(GlobalContext);
  const [commentsRendered, setCommentsRendered] = useState(false);
  const { viewProject, setViewProject } = useContext(ProjectContext);

  let id = value.gy.id;
  let view;
  let proj = viewProject;

  const addComment = async () => {
    newComment = document.getElementById("project-textarea").value;
    let projNr = proj.project_id;
    try {
      const body = {
        id,
        projNr,
        newComment,
      };
      console.log(body);
      const response = await fetch(`http://138.68.88.7:5000/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  if (proj) {
    return (
      <div className="project-info-container">
        <div className="project-title-container">
          <p>{proj.project_title}</p>
        </div>
        <div className="project-descr-container">
          <p>Tilleggsinformasjon</p>
          <p className="project-description">{proj.project_descr}</p>
        </div>
        <div className="project-completion-container"></div>
        <div className="comment-list-container">
          <p>Kommentarer</p>
          <div>
            <textarea
              classname="comment-textarea"
              id="project-textarea"
              placeholder="Skriv en kommentar"
            ></textarea>
          </div>
          <div onClick={addComment}>Add</div>
        </div>
      </div>
    );
  } else return null;
};

export default ProjectInfo;
