import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  DetailGridInfo,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';


const DetailCellRenderer = ({ data, node, api }: ICellRendererParams) => {
    const rowId = node.id!;
  
    useEffect(() => {
      return () => {
        console.log('removing detail grid info with id: ', rowId);
  
        // the detail grid is automatically destroyed as it is a React component
        api.removeDetailGridInfo(rowId);
      };
    }, []);
  
    const colDefs = [
      { field: 'callId' },
      { field: 'direction' },
      { field: 'number' },
      { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
      { field: 'switchCode' },
    ];
  
    const defaultColDef: ColDef = {
      flex: 1,
      minWidth: 120,
    };
  
    const onGridReady = (params: GridReadyEvent) => {
      const gridInfo: DetailGridInfo = {
        id: rowId,
        api: params.api,
        columnApi: params.columnApi,
      };
  
      console.log('adding detail grid info with id: ', rowId);
  
      api.addDetailGridInfo(rowId, gridInfo);
    };
  
    return (
      <div className="full-width-panel">
        <div className="full-width-details">
          <div className="full-width-detail">
            <b>Name: </b>
            {data.patientName}
          </div>
        </div>
       
      </div>
    );
  };
  
  export default DetailCellRenderer;