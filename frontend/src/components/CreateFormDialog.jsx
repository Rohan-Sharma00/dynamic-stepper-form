import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
} from "@mui/material";

function CreateFormDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: [],
  });

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: crypto.randomUUID(),
          title: "",
          fields: [],
        },
      ],
    }));
  };

  const updateStepTitle = (index, value) => {
    const steps = [...formData.steps];

    steps[index].title = value;

    setFormData({
      ...formData,
      steps,
    });
  };

  const addField = (stepIndex, type) => {
    const steps = [...formData.steps];

    steps[stepIndex].fields.push({
      id: crypto.randomUUID(),
      label: "",
      name: "",
      type,
      required: false,
    });

    setFormData({
      ...formData,
      steps,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Create Form
      </DialogTitle>

      <DialogContent>
        <div className="space-y-4 mt-2">
          <TextField
            fullWidth
            label="Form Name"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          <Button
            variant="outlined"
            onClick={addStep}
          >
            Add Step
          </Button>

          {formData.steps.map((step, index) => (
            <Paper
              key={step.id}
              className="p-4 mt-4"
            >
              <TextField
                fullWidth
                label={`Step ${index + 1} Name`}
                value={step.title}
                onChange={(e) =>
                  updateStepTitle(
                    index,
                    e.target.value
                  )
                }
              />

              <div className="flex gap-2 mt-4">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    addField(index, "text")
                  }
                >
                  Text
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    addField(index, "select")
                  }
                >
                  Select
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    addField(index, "radio")
                  }
                >
                  Radio
                </Button>
              </div>

              <div className="mt-4">
                {step.fields.map((field) => (
                  <div
                    key={field.id}
                    className="border rounded p-3 mt-2"
                  >
                    {field.type}
                  </div>
                ))}
              </div>
            </Paper>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button variant="contained">
          Save Form
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFormDialog;