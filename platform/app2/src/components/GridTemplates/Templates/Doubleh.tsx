import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '../../../../../ui/src/components/Typography';
import Dropdown from '../../../../../ui/src/components/Dropdown';

import { appList, App } from '../../../constants/views';

const ViewTemplateDoubleh = ({
    apps,
    showApps,
    selectApp
  }) => {

    const [dropDownListA, setDropDownListA] = useState([]);
    const [dropDownListB, setDropDownListB] = useState([]);

    const findAppForPosition = (position) => {
        const appData = apps.find(app => app.position === position);
        return appData ? appData.app.label : "Select an app";
    }

    const buildList = () => {
        let dropDownListATmp =[]
        for (let i = 0; i < appList.length; i++) {
            dropDownListATmp.push({ 
                title: appList[i].label,
                onClick: () => { 
                    selectApp(appList[i].name, 1)
                },
            })
        }
        setDropDownListA(dropDownListATmp)

        let dropDownListBTmp =[]
        for (let i = 0; i < appList.length; i++) {
            dropDownListBTmp.push({ 
                title: appList[i].label,
                onClick: () => { 
                    selectApp(appList[i].name, 2)
                },
            })
        }
        setDropDownListB(dropDownListBTmp)
    }

    useEffect(() => {
        buildList()
    }, [apps])

    useEffect(() => {
        buildList()
    }, [])
    return (
        <React.Fragment>
            <div className="m-auto grid grid-cols-2  gap-x-2 gap-y-2 py-2  min-w-full">
                <div  className={classnames("col-span-1 min-w-full bg-secondary-dark rounded-lg", {"h-28":!showApps})}>
                    <div className="grid h-full place-items-center">
                        { showApps && 
                            <Typography
                                variant="h2"
                                color="primaryActive"
                                className="flex items-center font-semibold"
                                >
                                <div>
                                    <Dropdown
                                        id="dropdown-1"
                                        list={dropDownListA}
                                    >
                                        <div className="text-black">
                                            {findAppForPosition(1)}
                                        </div>
                                    </Dropdown>
                                </div>
                            </Typography>
                        }
                    </div>
                </div>
                <div  className={classnames("col-span-1 min-w-full bg-secondary-dark rounded-lg", {"h-28":!showApps})}>
                    <div className="grid h-full place-items-center">
                    { showApps && 
                            <Typography
                                variant="h2"
                                color="primaryActive"
                                className="flex items-center font-semibold"
                                >
                                <div>
                                    <Dropdown
                                        id="dropdown-1"
                                        list={dropDownListB}
                                    >
                                        <div className="text-black">
                                            {findAppForPosition(2)}
                                        </div>
                                    </Dropdown>
                                </div>
                            </Typography>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


ViewTemplateDoubleh.propTypes = {
    apps: PropTypes.array.isRequired,
  selectApp: PropTypes.func.isRequired,
  showApps: PropTypes.bool.isRequired,
};


export default ViewTemplateDoubleh;