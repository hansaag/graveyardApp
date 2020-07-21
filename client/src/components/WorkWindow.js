import React, {
  useState,
  useContext,
  Fragment,
  useEffect,
  useMemo,
} from "react";

import { GlobalContext } from "../GlobalContext";
import { GlobalEdit } from "../GlobalEdit";

const WorkWindow = React.memo(({ openActivity, dia }) => {
  const { value, setValue } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalEdit);

  console.log(dia);

  useEffect(() => {}, [dia]);

  if (dia) {
    return <div className="work-window"></div>;
  } else {
    return <div className="work-window-invis"></div>;
  }
});

export default WorkWindow;
