import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";
import { PriorityButtonContext } from "../contexts/PriorityButtonContext";
import { PriorityButton } from "./PriorityButton";

const AddProject = ({ exit, project }) => {
  let pos = [1, 2, 3, 4, 5];
  let prio = null;
  const { priorityNum, setPriorityNum } = useContext(PriorityButtonContext);
  const { value, setValue } = useContext(GlobalContext);

  const addToDB = async (e) => {
    e.preventDefault();

    let gy_id = value.gy.id;
    let project_title = document.getElementById("textArea1").value;
    let project_descr = document.getElementById("textArea2").value;
    let project_prio = priorityNum;
    let deadline = null;

    console.log(gy_id);

    try {
      const body = {
        gy_id,
        project_title,
        project_descr,
        project_prio,
        deadline,
      };
      const response = await fetch("http://138.68.88.7:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  if (project)
    return (
      <div className="project-container">
        <div className="project-upper">
          <div className="project-title">
            <p>Gi en kort beskrivelse av oppaven (maks 35 ord)</p>
            <form className="project-title-form">
              <textarea
                type="text"
                className="project-title-form-in"
                id="textArea1"
              />
            </form>
          </div>
          <div className="project-body">
            <p>Legg ved ekstra informasjon (*)</p>
            <form className="project-body-form">
              <textarea
                type="text"
                className="project-body-form-in"
                id="textArea2"
              />
            </form>
            <div className="priority-buttons">
              <p>Velg prioritet</p>
              <ul className="priority-buttons-list">
                <PriorityButton pos={pos[0]} prio={prio} />
                <PriorityButton pos={pos[1]} prio={prio} />
                <PriorityButton pos={pos[2]} prio={prio} />
                <PriorityButton pos={pos[3]} prio={prio} />
                <PriorityButton pos={pos[4]} prio={prio} />
              </ul>
            </div>
          </div>
        </div>

        <div className="project-footer">
          <div className="project-cancel-button" onClick={exit}>
            Avbryt
          </div>
          <div className="project-register-button" onClick={addToDB}>
            Registrer
          </div>
        </div>
      </div>
    );
  else return <div style={{ display: "none" }}></div>;
};

export default AddProject;
