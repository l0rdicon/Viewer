import React from 'react';
import ReactSplit, { SplitDirection } from '../../components/Splitter';
import Tile from '../../pages/Home/Tile';

import { LayoutApp } from '../../constants/views';

interface Props {
    /**
     * item id of the selected webmap
     */
    apps: LayoutApp[]
    titles: string[]

}


const View2: React.FC<Props> = ({
    apps, 
    titles
 }: Props) => {

    const titleOne = titles.length > 0 ? titles[0] : "Worklist"
    const titleTwo = titles.length > 0 ? titles[1] : "Worklist"

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
        onResizeFinished={handleResizeFinished}>
      <ReactSplit direction={SplitDirection.Vertical}>
        <Tile title={titleOne}/>
        <Tile title={titleOne}/>
      </ReactSplit>
      <ReactSplit direction={SplitDirection.Vertical}>
        <Tile title={titleOne}/>
        <Tile title={titleOne}/>
      </ReactSplit>
    </ReactSplit>
  );
}

export default View2;