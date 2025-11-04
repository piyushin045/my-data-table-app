"use client";
import * as React from "react";
import { Button, Stack } from "@mui/material";
import DataTable from "./components/DataTable";
import ImportExportButtons from "./components/ImportExportButtons";
import ManageColumnsModal from "./components/ManageColumnsModal";

export default function Page() {
  const [open, setOpen] = React.useState(false);

  return (
    <Stack spacing={2} p={4}>
      <h2>Dynamic Data Table Manager</h2>
      <ImportExportButtons />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Manage Columns
      </Button>
      <DataTable />
      <ManageColumnsModal open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
}
