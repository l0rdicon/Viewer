import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '../../../../../platform/ui/src/components/ButtonGroup';
import LegacyButton from '../../../../../platform/ui/src/components/LegacyButton';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { useAppDispatch } from '../../store/hooks';

import { defaultLayoutsMap, defaultAppMap, defaultViews, Layout, View, Monitor, LayoutApp, appList } from '../../constants/views';
import Typography from '../../../../../platform/ui/src/components/Typography';
import Icon from '../../../../../platform/ui/src/components/Icon';
import IconButton from '../../../../../platform/ui/src/components/IconButton';
import Button from '../../../../../platform/ui/src/components/Button';

import { selectCurrentLayout, selectSavedLayouts } from '../../store/Layout/selectors';
import { updateSavedLayouts, updateCurrentLayout } from '../../store/Layout/thunks'

import { Single, Doubleh, Doublev, G1x2, G2x1, G2x1a, G2x1b, G2x1c, G2x2 } from '../GridTemplates/Templates'
import GridTemplates from '../GridTemplates';
import Dialog from '../../../../../platform/ui/src/components/Dialog';
import {
  useDialog,
  ButtonEnums,
  Input,
} from '@ohif/ui'
import { ServicesManager } from '@ohif/core';

const tabs = [
  {
    name: "one", 
    label: "1", 
  },
  {
    name: "two", 
    label: "2", 
  },
  {
    name: "three", 
    label: "3", 
  },
  {
    name: "four", 
    label: "4", 
  },
  {
    name: "five", 
    label: "5", 
  },
  {
    name: "six", 
    label: "6", 
  }
]


const LayoutModal = ({ 
  onCancel,
  onSubmit,
}) => {
  const currentView = useSelector(selectCurrentLayout);
  const savedViews = useSelector(selectSavedLayouts);
  const [unsavedView, setUnsavedView] = useState<View>(currentView);
  const [unsavedViews, setUnsavedViews] = useState<View[]>(savedViews);

  const dispatch = useAppDispatch();
  const { create, dismiss } = useDialog();

  let initalActiveApps: LayoutApp[]
  let initialCurrentLayout: Layout
  let intialLayoutID: number
  let initialCurrentMonitor: string

  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf(' electron/') > -1) {
    // Electron-specific code

    //if not on window 1 
    // setMonitorToEdit(wherewindowwhereon)
  } else { 
      initalActiveApps = unsavedView.one.layout.apps
      initialCurrentLayout =unsavedView.one.layout
      intialLayoutID = unsavedView.one.layout.id
      initialCurrentMonitor = "one"
  }

  const [activeTabName, setActiveTabName] = useState('one');
  const [showViewTemplates, setShowViewTemplates] = useState(false);
  const [currentlySelectedLayoutTemplateId, setCurrentlySelectedLayoutTemplateId] = useState(intialLayoutID);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeApps, setActiveApps] = useState<LayoutApp[]>(initalActiveApps);
  const [currentLayout, setCurrentLayout] = useState<Layout>(initialCurrentLayout);
  const [currentMonitor, setCurrentMonitor] = useState<string>(initialCurrentMonitor);

  
  

 // get details baout what monitor where on, or if this is mintor one and load apps. 
 // for now assume its monitor one



  const onClickTab =(name: string) => { 
    setCurrentMonitor(name)
    setActiveApps(unsavedView[name].layout.apps)
    setCurrentLayout(unsavedView[name].layout)
    setCurrentlySelectedLayoutTemplateId(unsavedView[name].layout.id)
    setActiveTabName(name)
  }


  const handleSelectApp = (name: string, position: number) => { 
    const appObj = appList.find(app => app.name === name)
    const newApp = {
      app: appObj,
      position: position
    }

    let tempUnsavedView = JSON.parse(JSON.stringify(unsavedView)) as View
    let tmpCurrentLayout = JSON.parse(JSON.stringify(currentLayout)) as Layout
    let tmpApps = JSON.parse(JSON.stringify(currentLayout.apps)) as LayoutApp[]

    const foundIndex = tmpCurrentLayout.apps.findIndex(x => x.position == position);
    if (foundIndex > -1) {
      tmpApps[foundIndex] = newApp;
      tmpCurrentLayout.apps = tmpApps
    } else { 
      tmpApps.push(newApp)
      tmpCurrentLayout.apps = tmpApps
    } 
    tempUnsavedView[currentMonitor].layout = tmpCurrentLayout

    setActiveApps(tmpApps)
    setCurrentLayout(tmpCurrentLayout)
    setUnsavedView(tempUnsavedView)
    setUnsavedChanges(true)

  }

  const  handleOpenViewTemplatePanel = () => { 
    setShowViewTemplates(!showViewTemplates)
  }

  const onViewTemplateSelect = (id: number) => {
      setActiveApps([])
      let tempUnsavedView = JSON.parse(JSON.stringify(unsavedView))
      let tmpCurrentLayout = JSON.parse(JSON.stringify(currentLayout))

      tmpCurrentLayout = defaultLayoutsMap[id]
      tmpCurrentLayout.apps = []
      tempUnsavedView[currentMonitor].layout = tmpCurrentLayout
      tempUnsavedView.apps = []

      setUnsavedView(tempUnsavedView)
      setCurrentLayout(tmpCurrentLayout)
      setUnsavedChanges(true)
      setCurrentlySelectedLayoutTemplateId(id)
  }

  const onSubmitHandler = () => { 
    console.log("clicked on submit!")
    

    // check it app apps are selected
    // and update the unsaved views here
    unsavedView.one.layout.apps = activeApps




  }

  const createUnsavedChangesDialog = () =>{ 
    create({
      id: 'context-menu',
      centralize: true,
      isDraggable: false,
      content: Dialog,
      contentProps: {
        title: "You have unsaved changes",
        value: { label: '' },
        noCloseButton: true,
        onClose: () => {
          dismiss({ id: "context-menu" })
        },
        onSubmit: ({ action, value }) => {

          switch (action.id) {
            case 'close':
              dismiss({ id: "context-menu" })
              onCancel()
              break
            case 'cancel':
               dismiss({ id: "context-menu" })
               break
            case 'save-close':
              dismiss({ id: "context-menu" })
              onCancel()
              break
          }
        },
        actions: [
          { id: 'cancel', text: 'Cancel', type: ButtonEnums.type.primary },
          { id: 'close', text: 'Close', type: ButtonEnums.type.primary },
          { id: 'save-close', text: 'Save and Close', type: ButtonEnums.type.primary },
        ],
        body: ({ value, setValue }) => {
          return (
           <div>
             <Typography
                variant="subtitle"
                component="p"
                color="initial"
                className="flex items-center"
              >Save changes before closing?</Typography>
           </div>
          );
        },
      },
    })
  }

  const onCancelHandler = () => {
    console.log("clicked on cancel!")

    if(unsavedChanges) {
      createUnsavedChangesDialog()
      return
    } 
    onCancel()
  };

  const getUniqueTitle = (name: string) => {
    let nameExists = false
    let isIncrement = false
    //get last 3 characters of the name string
    if (name.length > 3) {
      let last3 = name.slice(-3)
      let stringWithoutLast3 = name.slice(0, -3)
      // check in the last 3 characters is a number surronded by ()
      if (last3.charAt(0) === "(" && last3.charAt(2) === ")") {
          let incrementNumber = last3.charAt(2)
          let lastIncreatmentToExist = incrementNumber
          savedViews.forEach(view => {
            let titleToCheck = stringWithoutLast3 + " (" + incrementNumber + ")"

            if(view.title === titleToCheck) {
              let last3FromViewTitle = view.title.slice(-3)
              let incrementNumberFromViewTitle = last3FromViewTitle.charAt(2)

              if (Number(incrementNumberFromViewTitle) > Number(lastIncreatmentToExist)) {
                lastIncreatmentToExist = incrementNumberFromViewTitle
              }
            }
          })
          return stringWithoutLast3 + " (" + incrementNumber + ")"
      }
    }
    savedViews.forEach(view => {
      if(view.title === name) {
        nameExists = true
      }
    }
    )
    if(nameExists) {
      return name + " (1)"
    } else {
      return name
    }
  }



  const generateNewDefaultView = (title: string) => {
    let uniqueTitle = getUniqueTitle(title)
    let newLayout: View = { 
      "title": uniqueTitle,
      "one": {
        "active": true,
        "layout": { 
            ...defaultLayoutsMap[1],
            apps: [{
              app: defaultAppMap["worklist"],
              position: 1
          }],
        }
      },
      "two": {
        "active": true,
        "layout": { 
            ...defaultLayoutsMap[1],
            apps: [{
              app: defaultAppMap["worklist"],
              position: 1
          }],
        }
      },
      "three": {
        "active": true,
        "layout": { 
            ...defaultLayoutsMap[1],
            apps: [{
              app: defaultAppMap["worklist"],
              position: 1
          }],
        }
      },
      "four": {
        "active": true,
        "layout": { 
            ...defaultLayoutsMap[1],
            apps: [{
              app: defaultAppMap["worklist"],
              position: 1
          }],
        }
      },
      "five": {
        "active": true,
        "layout": { 
            ...defaultLayoutsMap[1],
            apps: [{
              app: defaultAppMap["worklist"],
              position: 1
          }],
        }
      },
      "six": {
        "active": true,
        "layout": { 
            ...defaultLayoutsMap[1],
            apps: [{
              app: defaultAppMap["worklist"],
              position: 1
          }],
        }
      }
    }

    let tempUnsavedViews = JSON.parse(JSON.stringify(unsavedViews)) as View[]
    tempUnsavedViews.push(newLayout)
    setUnsavedViews(tempUnsavedViews)
    dispatch(updateSavedLayouts(tempUnsavedViews))
  }

  const handleNewLayout = () => { 
    create({
      id: 'new-layout-menu',
      centralize: true,
      isDraggable: false,
      content: Dialog,
      contentProps: {
        title: "Create an new layout",
        value: { label: '' },
        noCloseButton: true,
        onClose: () => {
          dismiss({ id: "new-layout-menu" })
        },
        onSubmit: ({ action, value }) => {
          switch (action.id) {
            case 'create':
              generateNewDefaultView(value.label)
              dismiss({ id: "new-layout-menu" })
              break
            case 'cancel':
              dismiss({ id: "new-layout-menu" })
              break
          }
        },
        actions: [
          { id: 'cancel', text: 'Cancel', type: ButtonEnums.type.secondary },
          { id: 'create', text: 'Create', type: ButtonEnums.type.primary },
        ],
        body: ({ value, setValue }) => {
          const onChangeHandler = event => {
            event.persist();
            setValue(value => ({ ...value, label: event.target.value }));
          };
          const onKeyPressHandler = event => {
            if (event.key === 'Enter') {

            }
          };
          return (
            <Input
              autoFocus
              className="bg-black border-primary-main"
              type="text"
              id="createlayout"
              label="Enter the layout name"
              labelClassName="text-white text-[14px] leading-[1.2]"
              value={value.label}
              onChange={onChangeHandler}
              onKeyPress={onKeyPressHandler}
              required
            />
          );
        },
      },
    })
    
  }

 
  const getTabContent = () => {
    const tabData = tabs.find(tab => tab.name === activeTabName);
    return (
      <React.Fragment key={tabData.label}>
        <div className="relative mb-6">
          <div className="absolute left-4">
              <Typography
                variant="h5"
                color="primaryLight"
                className="flex items-center font-semibold pt-2 pl-5"
              >          
                  {unsavedView.title}
                  <Icon name="row-edit" className="w-5 ml-2 text-white cursor-pointer" onClick={()=>{
                    console.log("edit layout")
                  }}/>
              </Typography>
            </div>
            <div className="absolute right-4">
              <Typography
                variant="h5"
                color="primaryLight"
                className="font-semibold pt-2 pl-5"
              >
                View Template: 
                  <Button
                    id={'options-settings-icon'}
                    variant="outlined"
                    color="inherit"
                    size="small"
                    className={'text-white text-base p-3 ml-2'}
                    onClick={() => {
                      handleOpenViewTemplatePanel()
                    }}
                  >
                        <React.Fragment>
                          <div> {currentLayout.name}</div>
                      </React.Fragment>
                  </Button>

              </Typography>
            </div>
        </div>
        <div className="py-8 px-8" style={{height: "82%"}}>
            { currentlySelectedLayoutTemplateId === 1  && (
              <Single apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 2   && (
              <Doubleh apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 3   && (
              <Doublev apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 4  && (
              <G2x2 apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 5   && (
              <G2x1 apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 6  && (
              <G2x1a apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 7  && (
              <G2x1b apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
            { currentlySelectedLayoutTemplateId  === 8   && (
              <G1x2 apps={activeApps} selectApp={handleSelectApp} showApps={true}/>
            )}
        </div>
      </React.Fragment>
    );
  }

  const getDefaultViewList = () => { 
    return defaultViews.map(layout => {
      return (
        <React.Fragment key={layout.title}>
          <li className="flex justify-between gap-x-2 py-2 cursor-pointer hover:bg-secondary-dark rounded-lg">
            <div className="px-2">
              <div className="ml-2 flex flex-col">
                <div className="leading-snug text-md font-bold">{layout.title}</div>
                <div className="leading-snug text-sm">{layout.title}</div>
              </div>
         
            </div>
            { layout.title === currentView.title  && (
              <div className="mt-1 px-2 flex items-center">
                <span className="">Selected</span>
              </div>
            )}
        </li>
        </React.Fragment>
      )
    })
  }


  const getSavedViewList = () => { 
    return unsavedViews.map(layout => {
      return (
        <React.Fragment key={layout.title}>
          <li className="flex justify-between gap-x-2 py-2 cursor-pointer hover:bg-secondary-dark rounded-lg">
            <div className="px-2">
              <div className="ml-2 flex flex-col">
                <div className="leading-snug text-md font-bold">{layout.title}</div>
                <div className="leading-snug text-sm">{layout.title}</div>
              </div>
         
            </div>
            { layout.title === currentView.title && (
              <div className="mt-1 px-2 flex items-center">
                <span className="">Selected</span>
              </div>
            )}
        </li>
        </React.Fragment>
      )
    })
  }

  const renderRowTitle = title => (
    <div className="pb-3 mb-3 border-b-2 border-black">
      <Typography
        variant="inherit"
        color="primaryLight"
        className="text-[16px] font-semibold !leading-[1.2]"
      >
        {title}
      </Typography>
    </div>
  );

  return (

    <div className="m-auto grid grid-cols-8 gap-10 h-full">
        <div className="col-span-2 h-full">
            <div className="grid grid-rows-2 gap-4 w-full h-full">
              <div className="h-auto flex flex-col">
              {renderRowTitle('Default Layout List')}
                <ul role="list" className="w-full">
                  {getDefaultViewList()}
                </ul>
              </div>
              <div className="h-auto flex flex-col justify-between">
                <div className="content-start">
                  {renderRowTitle('User Layout List')}
                  <ul role="list" className="w-full">
                    {getSavedViewList()}
                </ul>
                </div>
                <div style={{textAlign: "right"}}>
   
                    <IconButton
                      id={'options-settings-icon'}
                      variant="text"
                      color="inherit"
                      size="initial"
                      className="text-primary-active"
                      onClick={() => {
                        handleNewLayout()
                      }}
                    >
                         <React.Fragment>
                            <div>{'New'}</div>
                            <Icon name="row-add" className="w-4 mx-1" />
                        </React.Fragment>
                    </IconButton>
                              
                </div>
              </div>
            </div>
         
        </div>
        <div   className={ classnames("h-full", {"col-span-6": !showViewTemplates}, {"col-span-5": showViewTemplates}) }>
          <div
            className="flex flex-row items-center justify-center h-16 p-4 border-b w-100 border-secondary-light bg-primary-dark"
          >
            <ButtonGroup variant="outlined" color="secondary" splitBorder={false}>
              {tabs.map(tab => {
                const { name, label } = tab;
                const isActive = activeTabName === name;
                // Apply the contrasting color for brighter button color visibility
                const color = "default";
                return (
                  <LegacyButton
                    key={name}
                    className={'text-white text-base p-2 min-w-18'}
                    size="initial"
                    color={color}
                    disabled={!currentView[name] || !currentView[name].active}
                    bgColor={isActive ? 'bg-primary-main' : 'bg-black'}
                    onClick={() => {
                      onClickTab(name);
                    }}
                    //disabled={isDisabled}
                  >
                    { "Monitor "+ label}
                  </LegacyButton>
                );
              })}
            </ButtonGroup>
          </div>
          <div className="flex flex-col flex-1  ohif-scrollbar invisible-scrollbar h-full relative">
              {getTabContent()}
              { unsavedChanges && (
                <div className="absolute left-12" style={{bottom: "72px"}}>
                  unsaved changes
                </div>
              )
              }
            
                { unsavedChanges && (
                    <div className="absolute right-12" style={{bottom: "72px"}}>
                      <Button
                        id={'options-settings-icon'}
                        variant="outlined"
                        color="inherit"
                        size="small"
                        className={'text-white text-base p-3 ml-2'}   
                        onClick={onCancelHandler}              
                      >
                            <React.Fragment>
                              <div>Cancel</div>
                          </React.Fragment>
                      </Button>
                      <Button
                        id={'options-settings-icon'}
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={onSubmitHandler}
                        className={'text-white text-base p-3 ml-2'}                
                      >
                            <React.Fragment>
                              <div>Save</div>
                          </React.Fragment>
                      </Button>
                      <Button
                        id={'options-settings-icon'}
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={onSubmitHandler}
                        className={'text-white text-base p-3 ml-2'}                
                      >
                            <React.Fragment>
                              <div>Save and Load</div>
                          </React.Fragment>
                      </Button>
                      </div>
                )}
                { !unsavedChanges && (
                  <div className="absolute right-12" style={{bottom: "72px"}}>
                    <Button
                      id={'options-settings-icon'}
                      variant="outlined"
                      size="small"
                      color="inherit"
                      onClick={onCancelHandler}
                      className={'text-white text-base p-3 ml-2'}                
                      >
                        <React.Fragment>
                          <div>Close</div>
                      </React.Fragment>
                    </Button>
                    <Button
                        id={'options-settings-icon'}
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={onSubmitHandler}
                        className={'text-white text-base p-3 ml-2'}                
                      >
                            <React.Fragment>
                              <div>Load</div>
                          </React.Fragment>
                      </Button>
                  </div>
                )}
              
          </div>
        </div>

        { showViewTemplates &&(
          <div className="col-span-1 h-full min-w-full mt-12  ohif-scrollbar overflow-scroll" style={{height: "90%"}}>
              <GridTemplates selectedId={currentlySelectedLayoutTemplateId} onSelect={onViewTemplateSelect}/>
          </div>
        )}
    </div>
  );
};

LayoutModal.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  servicesManager: PropTypes.instanceOf(ServicesManager),
};

export default LayoutModal;
