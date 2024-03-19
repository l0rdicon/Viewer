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

const Doubleh: React.FC<Props> = ({
    apps, 
    titles
 }: Props) => {

    function handleResizeStarted(gutterIdx: number) {
        var x = document.querySelectorAll("iframe");
        x.forEach(function(item){
          item.style.setProperty("pointer-events", "none")
        })
      }
      function handleResizeFinished(gutterIdx: number, newSizes: number[]) {
        var x = document.querySelectorAll("iframe");
        x.forEach(function(item){    
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
      <Tile title={titles[1]}>
        {getApplicationElement(findAppForPosition(apps, 2))}
       </Tile>
    </ReactSplit>
  );
}

export default Doubleh;