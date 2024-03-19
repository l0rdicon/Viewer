//import React, { useEffect, useState, useRef } from 'react';
import React, { useState } from 'react';

import { Classes, Overlay } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './StatusBar.css';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {
  useModal,
  AboutModal,
} from '@ohif/ui';

import { ServicesManager, HotkeysManager } from "@ohif/core"


import LayoutModal from '../LayoutModal';
interface Props {
    /**
     * item id of the selected webmap
     */
    version: string
    viewTitle: string
    showLock: boolean
    servicesManager: ServicesManager
    hotkeysManager: HotkeysManager
}

const StatusBar: React.FC<Props> = ({
       version,
       viewTitle,
       showLock
    }: Props) => {

    const [editingView, setEditingView] = useState(false);
    const { show, hide } = useModal();

    return (
        <div className="status-bar">
          <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
            <div className={Classes.NAVBAR_GROUP}>
              <div className={Classes.NAVBAR_HEADING}>         
                  <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)} style={{marginLeft: "-12px"}}>
                    {showLock && 
                      <>
                          <button
                              className={classNames(Classes.BUTTON, Classes.MINIMAL, editingView === false ? Classes.iconClass(IconNames.LOCK) :Classes.iconClass(IconNames.Unlock) )}
                              onClick={() => setEditingView(!editingView)}
                          >
                          </button>
                      </>
                    }
                    
                    <button
                        className={classNames(Classes.BUTTON, Classes.MINIMAL)}
                        onClick={() => 
                          show({
                            content: LayoutModal,
                            skipOverflow: true,
                            shouldCloseOnEsc: false, 
                            shouldCloseOnOverlayClick: false,
                            closeButton: false,
                            contentProps: {      
                              onCancel: state => {
                                console.log("hiding")
                                hide()
                              },
                              onSubmit: state => {

                              },
                            },
                            customClassName: 'full-size-modal',
                            customClassName2: 'layout-modal-max-height',
                            title: 'Manage you layout',
                            
                          })
                        }
                    >
                        {viewTitle}
                    </button>
                   
                </div>
              </div>
            </div>
            
            <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
              <span className="actions-label">CannonRAD PACS v${version}</span>
            </div>
          </div>
        </div>
      )
};

export default StatusBar;


/*

 <div className={classNames(Classes.NAVBAR_DIVIDER)}></div>
<button
    className={classNames(Classes.BUTTON, Classes.MINIMAL, Classes.iconClass(IconNames.ARROW_TOP_RIGHT))}
    //onClick={this.addToTopRight}
>
    Add Window to Top Right
</button>
*/