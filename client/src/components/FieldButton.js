import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  memo,
  useCallback,
} from "react";

import { GlobalContext } from "../GlobalContext";

export const FieldButton = React.memo(({ item, index, click }) => {
  const [active, SetActive] = useState(false);

  const toggle = () => {
    SetActive(!active);
  };

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
