import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '../../../../../ui/src/components/Typography';
import Dropdown from '../../../../../ui/src/components/Dropdown';
import { appList, App } from '../../../constants/views';

const ViewTemplateSingle = ({
    apps,
    showApps,
    selectApp
  }) => {

    const [dropDownListA, setDropDownListA] = useState([]);

    const findAppForPosition = (position) => {
        const appData = apps.find(app => app.position === position);
        return appData ? appData.app.label : "Select an app";
    }

    useEffect(() => {
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
    }, [])
    return (
        <React.Fragment>
        <div className="m-auto grid grid-rows-2 grid-cols-2 gap-x-2 gap-y-2 py-2 min-w-full h-full">
          <div  className={classnames("col-span-2 row-span-2  min-w-full bg-secondary-dark rounded-lg")}
          >
              <div className="grid h-full place-items-center w-full">
              { showApps && 
                        <Typography
                            variant="h1"
                            color="primaryActive"
                            className="flex items-center font-semibold"
                            >
                            <div>
                                <Dropdown
                                    id="dropdown-1"
                                    list={dropDownListA}
                                >
                                    <div className="text-white">
                                        {findAppForPosition(1)}
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


ViewTemplateSingle.propTypes = {
  apps: PropTypes.array.isRequired,
  selectApp: PropTypes.func.isRequired,
  showApps: PropTypes.bool.isRequired,
};


export default ViewTemplateSingle;