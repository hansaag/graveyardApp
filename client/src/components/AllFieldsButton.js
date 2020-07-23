import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  memo,
  useCallback,
} from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { FieldButtons } from "../contexts/FieldButtons";

export const AllFieldsButton = ({ name }) => {
  const { allClicked, setAllClicked } = useContext(FieldButtons);

  const handleAllClick = () => {
    console.log(allClicked);
    setAllClicked(!allClicked);
    console.log(allClicked);
  };

  useEffect(() => {}, [allClicked]);

  useEffect(() => {}, [allClicked]);

  return (
    <a
      className={!allClicked ? "all-fields-button" : "all-fields-button-active"}
      onClick={() => handleAllClick()}
    >
      {name}
    </a>
  );
};
