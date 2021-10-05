import React, {
  useContext,
  useEffect,
} from "react";

import "../stylesheets/allFieldsButton.css"
import { FieldButtons } from "../contexts/FieldButtons";

export const AllFieldsButton = ({ name }) => {
  const { allClicked, setAllClicked } = useContext(FieldButtons);

  const handleAllClick = () => {
    if (allClicked == 1) setAllClicked(2);
    if (allClicked == 2) setAllClicked(1);
    if (allClicked == 3) setAllClicked(2);
  };

  useEffect(() => {}, [allClicked]);

  if (allClicked == 2)
    return (
      <a
        className={"all-fields-button-active"}
        onClick={() => handleAllClick()}
      >
        {name}
      </a>
    );
  else
    return (
      <a className={"all-fields-button"} onClick={() => handleAllClick()}>
        {name}
      </a>
    );
};
