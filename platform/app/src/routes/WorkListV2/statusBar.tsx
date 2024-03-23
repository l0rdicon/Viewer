import React from 'react';
import { IStatusPanelParams } from 'ag-grid-community';

export default (props: IStatusPanelParams) => {
  const onClick = () => {
    alert('Selected Row Count: ' + props.api.getSelectedRows().length);
  };

  const style = {
    padding: 5,
    margin: 5,
  };

  return (
    <input
      style={style}
      type="button"
      onClick={onClick}
      value="Click Me For Profit"
    />
  );
};