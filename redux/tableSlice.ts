import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RowData {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any;
}

export interface ColumnState {
  field: string;
  headerName: string;
  visible: boolean;
}

interface TableState {
  rows: RowData[];
  columns: ColumnState[];
}

const initialState: TableState = {
  rows: [
    { id: 1, name: 'Alice', email: 'alice@mail.com', age: 25, role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', age: 30, role: 'Editor' },
    {id:3, name:'piyush', email:'piyush@mail.com', age: 29, role: 'HR'},
    { id: 4, name: "Charlie", email: "charlie@mail.com", age: 28, role: "Viewer" },
    { id: 5, name: "David", email: "david@mail.com", age: 35, role: "Manager" },
   { id: 6, name: 'ayush', email: 'ayush@mail.com', age: 20, role: 'Admin' },
    { id: 7, name: 'anushka', email: 'anushka@mail.com', age: 21, role: 'Editor' },
    {id:8, name:'ashish', email:'piyush@mail.com', age: 26, role: 'Host'},
    { id: 9, name: "susumita", email: "susmita@mail.com", age: 33, role: "Viewer" },
   { id: 10, name: "menu", email: "menu@mail.com", age: 35, role: "Manager" },
    
  ],
  columns: [
    { field: 'name', headerName: 'Name', visible: true },
    { field: 'email', headerName: 'Email', visible: true },
    { field: 'age', headerName: 'Age', visible: true },
    { field: 'role', headerName: 'Role', visible: true },
  ],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<RowData>) => {
      state.rows.push(action.payload);
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    updateRow: (state, action: PayloadAction<RowData>) => {
      const index = state.rows.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.rows[index] = action.payload;
    },
    addColumn: (state, action: PayloadAction<ColumnState>) => {
      state.columns.push(action.payload);
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find((c) => c.field === action.payload);
      if (column) column.visible = !column.visible;
    },
    setRows: (state, action: PayloadAction<RowData[]>) => {
      state.rows = action.payload;
    },
  },
});

export const {
  addRow,
  deleteRow,
  updateRow,
  addColumn,
  toggleColumnVisibility,
  setRows,
} = tableSlice.actions;

export default tableSlice.reducer;
