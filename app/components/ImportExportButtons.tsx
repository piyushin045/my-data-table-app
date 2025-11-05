"use client";
import * as React from "react";
import { Button, Stack } from "@mui/material";
import Papa from "papaparse";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setRows } from "@/redux/tableSlice";

export default function ImportExportButtons() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { rows, columns } = useSelector((state: RootState) => state.table);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        // cast parsed data to any[] to satisfy the setRows typing
        const parsed = result.data as any[];
        dispatch(setRows(parsed));
      },
    });
  };

  const handleExport = () => {
    const visibleCols = columns.filter((c) => c.visible).map((c) => c.field);
    const filteredRows = rows.map((row) =>
      Object.fromEntries(Object.entries(row).filter(([key]) => visibleCols.includes(key)))
    );

    const csv = Papa.unparse(filteredRows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_export.csv";
    link.click();
  };

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Button variant="contained" component="label">
        Import CSV
        <input
          hidden
          accept=".csv"
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
        />
      </Button>
      <Button variant="outlined" onClick={handleExport}>
        Export CSV
      </Button>
    </Stack>
  );
}
