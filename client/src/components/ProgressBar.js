import React, { useContext, useEffect } from "react";

import { ProgressContext } from "../contexts/ProgressContext";

export const ProgressBar = ({ done }) => {

  const { temporaryProgress, setTemporaryProgress } = useContext(
    ProgressContext
  );

  let progress;

  if (temporaryProgress != null && temporaryProgress > done) {
    progress = temporaryProgress;
  } else {
    progress = done;
  }

  useEffect(() => {}, [temporaryProgress]);

  return (
    <div className="progress-container">
      <div className="progress">
        <div
          className="progress-done"
          style={
            progress < 10
              ? { width: `${progress}%`, color: "black" }
              : { width: `${progress}%` }
          }
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};
