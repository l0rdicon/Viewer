import React from 'react';
import ReactSplit, { SplitDirection } from '../Splitter';
import Tile from '../../pages/Home/Tile';
import { LayoutApp } from '../../constants/views';
import { getApplicationElement, findAppForPosition }  from '../../utils/pacs';

interface Props {
    /**
     * item id of the selected webmap
     */
    apps: LayoutApp[]
    titles: string[]
}

const View1: React.FC<Props> = ({
    apps, 
    titles
 }: Props) => {

 
   
    function handleResizeStarted(gutterIdx: number) {
        console.log('Resize started!', gutterIdx);
        var x = document.querySelectorAll("iframe");
        x.forEach(function(item){
          console.log("setigram no pointer evens")
          item.style.setProperty("pointer-events", "none")
        })
      }
      function handleResizeFinished(gutterIdx: number, newSizes: number[]) {
        console.log('Resize finished!', gutterIdx, newSizes);
        var x = document.querySelectorAll("iframe");
        x.forEach(function(item){
          console.log("setigram yes pointer evens")
    
          item.style.setProperty("pointer-events", "auto")
        })
      }

  return (
    <ReactSplit  direction={SplitDirection.Horizontal}
        onResizeStarted={handleResizeStarted}
        onResizeFinished={handleResizeFinished}
    >
      <Tile title={titles[0]}>
        {getApplicationElement(findAppForPosition(apps, 1))}
      </Tile>
    </ReactSplit>
  );
}

export default View1;