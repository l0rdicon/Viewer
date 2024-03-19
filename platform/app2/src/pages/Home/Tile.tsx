import React from 'react';
import './Tile.css';

interface TileProps {
  children?: React.ReactNode;
  title: string
}

function Tile({ children, title }: TileProps) {
  return (
    <div className="tile">
       <div className="toolbar">{title}</div>
      {children}
    </div>
  );
}

export default Tile;