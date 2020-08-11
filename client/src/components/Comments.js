import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";

const Comments = () => {
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const { value, setValue } = useContext(GlobalContext);
  let fetchedComments;

  let id = value.gy.id;
  let proj = viewProject;

  const renderComments = (arr) => {
    fetchedComments = arr.map((it) => (
      <li>
        <p>{it["comment"]}</p>
      </li>
    ));
    console.log(fetchedComments);
    return fetchedComments;
  };

  try {
    fetch(`http://138.68.88.7:5000/comments/${id}/${proj["project_id"]}`)
      .then((res) => res.json())
      .then((json) => renderComments(json));
  } catch (err) {
    console.error(err.message);
  }
};
