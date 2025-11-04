"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addColumn, toggleColumnVisibility } from "@/redux/tableSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: Props) {
  const columns = useSelector((state: RootState) => state.table.columns);
  const dispatch = useDispatch();
  const [newColumn, setNewColumn] = React.useState("");

  const handleAdd = () => {
    if (newColumn.trim()) {
      dispatch(addColumn({ field: newColumn, headerName: newColumn, visible: true }));
      setNewColumn("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        {columns.map((col) => (
          <FormControlLabel
            key={col.field}
            control={
              <Checkbox
                checked={col.visible}
                onChange={() => dispatch(toggleColumnVisibility(col.field))}
              />
            }
            label={col.headerName}
          />
        ))}

        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            label="New Column"
            size="small"
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
          />
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
