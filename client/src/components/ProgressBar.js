import React, { useState, useContext, Fragment, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalEdit } from "../contexts/GlobalEdit";

import JsonActivities, { cleanComments } from "../utilities/JsonActivities";
import { ProjectContext } from "../contexts/ProjectContext";
import { ProgressContext } from "../contexts/ProgressContext";

export const ProgressBar = ({ done }) => {
    const { viewProject, setViewProject } = useContext(ProjectContext);
    const { value, setValue } = useContext(GlobalContext);
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
