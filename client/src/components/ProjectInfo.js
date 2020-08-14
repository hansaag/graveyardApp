import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";
import { ProgressContext } from "../contexts/ProgressContext";
import { ProgressBar } from "./ProgressBar";

const ProjectInfo = () => {
  let newComment;
  const { value, setValue } = useContext(GlobalContext);
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const { temporaryProgress, setTemporaryProgress } = useContext(
    ProgressContext
  );
  const [commentsRendered, setCommentsRendered] = useState([]);
  const [newlyAddedComment, setNewlyAddedComment] = useState(false);
  const [input, setInput] = useState(false);
  const [progressAdded, SetProgressAdded] = useState(false);

  const registerInput = (e) => {
    console.log(e.target.value);
    if (e.target.value.length < 4) {
      setInput(false);
    } else setInput(true);
  };

  let id = value.gy.id;

  const renderComments = (arr) => {
    let fetchedComments = arr.map((it) => {
      let dateEntry =
        it["added"].substring(8, 10) + "." + it["added"].substring(5, 7);
      return (
        <li>
          <p>
            - &nbsp; <span className="comment-date">{dateEntry}</span>: &nbsp;
            {it["comment"]}
          </p>
        </li>
      );
    });
    console.log(fetchedComments);
    setCommentsRendered(fetchedComments);
  };
  const getComments = async () => {
    try {
      await fetch(
        `http://138.68.88.7:5000/comments/${id}/${viewProject["project_id"]}`
      )
        .then((res) => res.json())
        .then((json) => renderComments(json));
    } catch (err) {
      console.error(err.message);
    }
  };

  const addComment = async () => {
    newComment = document.getElementById("project-textarea").value;
    console.log(newComment.length);
    if (newComment.length < 5) return;
    let ser = viewProject.project_id;
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
      setInput(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const increaseProgress = () => {
    SetProgressAdded(true);

    setTemporaryProgress((prev) => {
      if (temporaryProgress == null) {
        console.log(temporaryProgress);
        console.log(viewProject.percent_finished);
        return viewProject.percent_finished + 5;
      } else if (temporaryProgress == 100) {
        return prev;
      } else {
        console.log(temporaryProgress);

        return prev + 5;
      }
    });
  };

  const regretProgress = () => {
    setTemporaryProgress(null);
    SetProgressAdded(false);
  };

  useEffect(() => {
    regretProgress();
    setCommentsRendered([]);
    getComments();
  }, [viewProject]);

  useEffect(() => {
    getComments();
    setNewlyAddedComment(false);
  }, [newlyAddedComment]);

  if (viewProject) {
    return (
      <div className="project-info-container">
        <div className="project-title-container">
          <div className="project-visual-info">
            <div className="project-prio-visual">
              P{viewProject.project_prio}
            </div>
          </div>
          <p>{viewProject.project_title}</p>
        </div>
        <div className="project-start-date">
          <p>
            Startet: {viewProject.added.substring(8, 10)}.
            {viewProject.added.substring(5, 7)}.
            {viewProject.added.substring(0, 4)}
          </p>
        </div>

        <div className="progress-box">
          <ProgressBar done={viewProject.percent_finished} />
          <div className="progress-input" onClick={increaseProgress}>
            +
          </div>
          <div
            className={`progress-abort-button ${progressAdded ? "show" : ""}`}
            onClick={regretProgress}
          >
            x
          </div>
          <div
            className={`progress-register-button ${
              progressAdded ? "show" : ""
            }`}
          >
            &#10003;
          </div>
        </div>

        <div className="project-descr-container">
          <p className="project-description-header">Tilleggsinformasjon</p>
          <p className="project-description">{viewProject.project_descr}</p>
        </div>
        <div className="project-completion-container"></div>
        <div className="comment-list-container">
          <p className="comment-list-header">Kommentarer</p>
          <ul className="comment-list">{commentsRendered}</ul>
          <div className="comment-input-container">
            <textarea
              className="comment-textarea"
              id="project-textarea"
              placeholder=" Skriv en kommentar &#13;&#10;  (minst 4 tegn)"
              onChange={(e) => registerInput(e)}
            ></textarea>
            <div
              className={`add-comment-button ${input ? "show" : ""}`}
              id="submit-comment"
              onClick={addComment}
            >
              +
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default ProjectInfo;
