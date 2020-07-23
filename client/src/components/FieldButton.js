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
  };

  const allToggled = () => {
    if (allClicked) SetActive(true);
    else SetActive(false);
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
      <a className="round-button-work-inactive" onClick={toggle}>
        {item}
      </a>
    );
});
