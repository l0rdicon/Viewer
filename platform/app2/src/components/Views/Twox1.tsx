import React from 'react';
import ReactSplit, { SplitDirection } from '../Splitter';
import Tile from '../../pages/Home/Tile';
import { LayoutApp, defaultAppMap } from '../../constants/views';
import { getApplicationElement, findAppForPosition }  from '../../utils/pacs';

interface Props {
    /**
     * item id of the selected webmap
     */
    apps: LayoutApp[]
    titles: string[]
}

const Twox1: React.FC<Props> = ({
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
        console.log('Resize finished!', gutterIdx, newSizes);
        var x = document.querySelectorAll("iframe");
        x.forEach(function(item){
          item.style.setProperty("pointer-events", "auto")
        })
      }

  return (
    <ReactSplit direction={SplitDirection.Vertical} onResizeStarted={handleResizeStarted}
    onResizeFinished={handleResizeFinished}>
        <ReactSplit direction={SplitDirection.Horizontal}>
            <Tile title={titles[0]}>
                {getApplicationElement(findAppForPosition(apps, 1))}
            </Tile>
            <Tile title={titles[1]}>
                {getApplicationElement(findAppForPosition(apps, 2))}
            </Tile>
        </ReactSplit>
        <Tile title={titles[2]}>
            {getApplicationElement(findAppForPosition(apps, 3))}
        </Tile>
    </ReactSplit>
  );
}

export default Twox1;