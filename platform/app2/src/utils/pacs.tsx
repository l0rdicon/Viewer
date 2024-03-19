

import React, {Component} from "react";

export const getApplicationElement = (app) => {
    switch (app) { 
        case "worklist":
            return (
                <iframe src="https://opnips.com/viewer/" className="viewer" />
            ) 
    }

} 

export const findAppForPosition = (apps, position) => {
    const appData = apps.find(app => app.position === position);
    return appData ? appData.app.label : "worklist";
}