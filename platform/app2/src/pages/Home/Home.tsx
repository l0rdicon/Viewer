//import dropRight from 'lodash/dropRight';
import React, { useState } from 'react';
import StatusBar from '../../components/StatusBar'
import ReactSplit, { SplitDirection } from '../../components/Splitter';
import Tile from './Tile';
import './Home.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectCurrentLayout } from '../../store/Layout/selectors';
import { defaultAppMap } from '../../constants/views';

import Single from '../../components/Views/Single'
import Doubleh from '../../components/Views/Doubleh'
import Doublev from '../../components/Views/Doublev'
import Twox2 from '../../components/Views/Twox2';
import Twox1 from '../../components/Views/Twox1';
import Twox1a from '../../components/Views/Twox1a';
import Twox1b from '../../components/Views/Twox1b';
import Onex2 from '../../components/Views/Onex2';


import View2 from '../../components/Views/View2'
// tslint:disable no-console
// tslint:disable-next-line no-var-requires
const { version } = require('../../../package.json');


const Home =  () => {

   
    const currentLayout = useSelector(selectCurrentLayout);
    console.log("currentLayout", currentLayout.one)

    //const monitorOneLayoutID = currentLayout.monitors["1"]
    const monOne = currentLayout.one
    let layoutID = monOne.layout.id

    console.log("got layoutid!", monOne, layoutID)

    let titles: string[] = []
    monOne.layout.apps.forEach((app: any) => {
      titles.push(app.title)
    })

    let validApps = []
    monOne.layout.apps.forEach((app: any) => {
     if (!defaultAppMap[app.app.name]) {
       validApps.push(app.app)
     } else { 
       validApps.push(defaultAppMap["worklist"])
     }
    })

    return (
      <div className={`cannonrad-app`}>  
        <div className="windows">
          {layoutID === 1 && <Single apps={validApps} titles={titles} />}
          {layoutID === 2 && <Doubleh apps={validApps} titles={titles} />}
          {layoutID === 3 && <Doublev apps={validApps} titles={titles} />}
          {layoutID === 4 && <Twox2 apps={validApps} titles={titles} />}
          {layoutID === 5 && <Twox1 apps={validApps} titles={titles} />}
          {layoutID === 6 && <Twox1a apps={validApps} titles={titles} />}
          {layoutID === 7 && <Twox1b apps={validApps} titles={titles} />}
          {layoutID === 8 && <Onex2 apps={validApps} titles={titles} />}
        </div>
        <StatusBar version={version} viewTitle={currentLayout.title} showLock={layoutID > 1} />
      </div>
    )



    function buildTemplateMap(layout: any) { 
      let l = layout
      if(!l.layout.rowOne && l.layout.columnOne) { 
          // got a multi co
          let tiles = getTileCount(l.layout.columnOne.data)
          let template = []
          template.push('vertical')
          for(let i = 0; i < tiles;i++) {
              template.push("tile")
          }
          console.log(template)
          return template
      }
  
  
      if(!l.layout.rowTwo && l.layout.rowOne) {
          let tiles = getTileCount(l.layout.rowOne.data)
          let template = []
          if(tiles > 1) {
              template.push('horizontal')
          }
          for(let i = 0; i < tiles;i++) {
              template.push("tile")
          }
          console.log(template)
          return template
      }
  
      if(l.layout.rowTwo && l.layout.rowOne) {
          let tilesOne = getTileCount(l.layout.rowOne.data)
          let tilesTwo = getTileCount(l.layout.rowTwo.data)
          let template = []
          template.push('vertical')
          template.push('horizontal')
          for(let i = 0; i < tilesOne;i++) {
              template.push("tile")
          }  
          template.push('horizontal')
          for(let i = 0; i < tilesTwo;i++) {
              template.push("tile")
          }
          return template
      }
      
      return {}
  }

  function getTileCount(rowdata: string){ 
    let tiles = rowdata.split("|")
    return tiles.length
  }
}

export default Home;