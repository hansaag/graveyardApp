import React, { useContext } from "react";

import { GlobalEdit } from "../contexts/GlobalEdit";
import "../stylesheets/registerWork.css"

const RegisterWork = () => {
  const { edit, setEdit } = useContext(GlobalEdit);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="register-activities" onClick={() => toggleEdit()}>
      <p>
        <span>+</span> FULLFØRT
      </p>
    </div>
  );
};

export default RegisterWork;
