import React, { useState, useContext, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { ProgressContext } from "../contexts/ProgressContext";
import { ProgressBar } from "./ProgressBar";
import { chosenConnection } from "../utilities/Connections";
import "../stylesheets/projectInfo.css";

const ProjectInfo = ({ updateLocalProjectValue }) => {
  const { value } = useContext(GlobalContext);
  const { viewProject } = useContext(ProjectContext);
  const { temporaryProgress, setTemporaryProgress } =
    useContext(ProgressContext);
  const [commentsRendered, setCommentsRendered] = useState([]);
  const [newlyAddedComment, setNewlyAddedComment] = useState(false);
  const [input, setInput] = useState(false);
  const [progressAdded, SetProgressAdded] = useState(false);

  const registerInput = (e) => {
    if (e.target.value.length < 4) {
      setInput(false);
    } else setInput(true);
  };

  let id = value.gy.id;

  const renderComments = (arr) => {
    let fetchedComments = arr.map((comment, index) => {
      let dateEntry =
        comment["added"].substring(8, 10) +
        "." +
        comment["added"].substring(5, 7);
      return (
        <li key={index}>
          <p>
            - &nbsp; <span className="comment-date">{dateEntry}</span>: &nbsp;
            {comment["comment"]}
          </p>
        </li>
      );
    });
    setCommentsRendered(fetchedComments);
  };
  const getComments = async () => {
    if (viewProject!== null)
    try {
      await fetch(
        `${chosenConnection}/comments/${id}/${viewProject["project_id"]}`
      )
        .then((res) => res.json())
        .then((json) => renderComments(json));
    } catch (err) {
      console.error(err.message);
    }
  };

  const addComment = async () => {
    let newComment = document.getElementById("project-textarea").value;

    if (newComment.length < 5) return;
    let ser = viewProject.project_id;
    try {
      const body = {
        id,
        ser,
        newComment,
      };
      await fetch(`${chosenConnection}/comments`, {
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
      if (temporaryProgress === null) {
        return viewProject.percent_finished + 5;
      } else if (temporaryProgress === 100) {
        return prev;
      } else {
        return prev + 5;
      }
    });
  };

  const regretProgress = () => {
    setTemporaryProgress(null);
    SetProgressAdded(false);
  };

  const submitProgress = async () => {
    SetProgressAdded(false);
    try {
      const body = { temporaryProgress };
      await fetch(
        `${chosenConnection}/projects/${viewProject.gy_id}/${viewProject.project_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      updateLocalProjectValue(viewProject, temporaryProgress);
      setTemporaryProgress(body["temporaryProgress"]);
    } catch (err) {
      console.log(err.message);
    }
  };

  /* if another project is opened, regret progress if user
  hasn't submittet and fetch comments for the new project
  */
  useEffect(() => {
    regretProgress();
    getComments();
  }, [viewProject]);

  /* if a comment is added newlyAddedComment is set to true
  therefore it is set back to false. Comments are also reloaded
  */

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
            onClick={submitProgress}
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
