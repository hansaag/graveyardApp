import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

const RegisterWork = () => {
  const { value, setValue } = useContext(GlobalContext);
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
