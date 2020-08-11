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

export const FieldButton = React.memo(({ item, index, click }) => {
  const { allClicked, setAllClicked } = useContext(FieldButtons);
  const [active, SetActive] = useState(false);

  const toggle = () => {
    SetActive(!active);
    if (allClicked == 2) {
      setAllClicked(3);
    }
  };

  const toggleInactive = () => {
    SetActive(!active);
  };

  const allToggled = () => {
    if (allClicked == 2) SetActive(true);
    if (allClicked == 1) SetActive(false);
  };

  useEffect(() => {
    allToggled();
  }, [allClicked]);

  useEffect(() => {}, [active]);

  if (active)
    return (
      <a className="round-button-work-active" onClick={toggle}>
        {item}
      </a>
    );
  else
    return (
      <a className="round-button-work-inactive" onClick={toggleInactive}>
        {item}
      </a>
    );
});
