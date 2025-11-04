"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateRow } from "@/redux/tableSlice";

export default function DataTable() {
  const { rows, columns } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch();

  const visibleColumns: GridColDef[] = columns
    .filter((c) => c.visible)
    .map((c) => ({
      field: c.field,
      headerName: c.headerName,
      flex: 1,
      editable: true,
    }));

  const handleProcessRowUpdate = (newRow: any) => {
    dispatch(updateRow(newRow));
    return newRow;
  };
    console.log("Rendered with rows:", rows, "and columns:", columns);
  return (
    
    <div style={{ height: 500, width: "100%" }}>
        
      <DataGrid
  rows={rows}
  columns={visibleColumns}
  pagination
  pageSizeOptions={[5, 10, 25, 50]}
  initialState={{
    pagination: {
      paginationModel: { pageSize: 10, page: 0 },
    },
  }}
  processRowUpdate={handleProcessRowUpdate}
  slots={{ toolbar: GridToolbar }}
/>

    </div>
  );
}
