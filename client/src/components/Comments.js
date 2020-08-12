import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";

export const Comments = ({input, parentClick}) => {
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const { value, setValue } = useContext(GlobalContext);
  let fetchedComments = [];

  let id = value.gy.id;
  let proj = viewProject;

  
}
  

  
