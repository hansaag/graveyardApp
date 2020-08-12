import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";
import {Comments} from "./Comments";

const ProjectInfo = ({ toggleProject }) => {
  let newComment;
  const { value, setValue } = useContext(GlobalContext);
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const [commentsRendered, setCommentsRendered] = useState([]);
  const [newlyAddedComment, setNewlyAddedComment] = useState(false);

  let id = value.gy.id;
  let view;
  let proj = viewProject;

  const renderComments = (arr) => {
    let fetchedComments = arr.map((it) => (
      <li>
        <p>{it["comment"]}</p>
      </li>
    ));
    console.log(fetchedComments);
    setCommentsRendered(fetchedComments);
  };
  const getComments = async () => {
    try {
      await fetch(`http://138.68.88.7:5000/comments/${id}/${proj["project_id"]}`)
        .then((res) => res.json())
        .then((json) => renderComments(json));
    } catch (err) {
      console.error(err.message);
    }
  };

  const addComment = async () => {
    newComment = document.getElementById("project-textarea").value;
    let ser = proj.project_id;
    try {
      const body = {
        id,
        ser,
        newComment,
      };
      console.log(body);
      const response = await fetch(`http://138.68.88.7:5000/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      document.getElementById("project-textarea").value = null;
      setNewlyAddedComment(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, [viewProject])

  useEffect(() => {
    getComments();
    setNewlyAddedComment(false);
  }, [newlyAddedComment])

  if (proj) {
    return (
      <div className="project-info-container">
        <div className="project-title-container">
          <p>{proj.project_title}</p>
        </div>
        <div className="project-descr-container">
          <p className="project-description-header">Tilleggsinformasjon</p>
          <p className="project-description">{proj.project_descr}</p>
        </div>
        <div className="project-completion-container"></div>
        <div className="comment-list-container">
          <p className="comment-list-header">Kommentarer</p>
          <ul className="comment-list">{commentsRendered}</ul>
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
