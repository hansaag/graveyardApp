import React, { useState, useContext, Fragment } from "react";

import { GlobalContext } from "../GlobalContext";

const RegisterWork = () => {
  const { value, setValue } = useContext(GlobalContext);

  return (
    <div className="register-activities">
      <p>Registrer Arbeid</p>
    </div>
  );
};

export default RegisterWork;
