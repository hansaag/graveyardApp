import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";

export const ProgressBar = ({done}) => {
  const { viewProject, setViewProject } = useContext(ProjectContext);
  const { value, setValue } = useContext(GlobalContext);
  
  return(
    <div className="progress-container">
      <div className="progress">
      <div className="progress-done" style={done<10?{width:`${done}%`, color:"black"} :{width:`${done}%`} }>
        {done}%
      </div>
    </div>
    </div>
    
  )
  
}
  

  
