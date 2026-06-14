import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Divider,
  Box,
  Stack,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { createForm } from "../services/form.service";

function CreateFormDialog({
  open,
  onClose,
  refreshForms,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form validation state

  const handleSave = async () => {
    setIsSubmitted(true);

    if (!title.trim()) {
      return; // Validation fails; styling handles inline error feedback
    }

    try {
      await createForm({
        title,
        description,
        steps: [],
      });

      refreshForms();

      // Reset states on success
      setTitle("");
      setDescription("");
      setIsSubmitted(false);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsSubmitted(false);
    onClose();
  };

  // Inline dynamic validation checker
  const isTitleInvalid = isSubmitted && !title.trim();

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AddCircleIcon
            color="primary"
            sx={{ fontSize: 40 }}
          />

          <Box>
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
            >
              Create Form
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.2 }}
            >
              Configure a new dynamic workflow layout schema
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Form Name"
            placeholder="Enter form name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            error={isTitleInvalid}
            helperText={isTitleInvalid ? "Form Name is required" : ""}
            slotProps={{
              htmlInput: { sx: { fontWeight: 500 } }
            }}
          />

          <TextField
            label="Description"
            placeholder="Enter description text summary..."
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          onClick={handleCancel}
          variant="text"
          sx={{ textTransform: "none", fontWeight: 600, color: "text.secondary" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disableElevation
          onClick={handleSave}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            px: 3,
          }}
        >
          Create Form
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFormDialog;