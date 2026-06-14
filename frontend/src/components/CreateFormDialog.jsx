import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { createForm } from "../services/form.service";

function CreateFormDialog({
  open,
  onClose,
  refreshForms,
}) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const handleSave = async () => {
    try {
      await createForm({
        title,
        description,
        steps: [],
      });

      refreshForms();

      setTitle("");
      setDescription("");

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        Create Form
      </DialogTitle>

      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            label="Form Name"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            fullWidth
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFormDialog;