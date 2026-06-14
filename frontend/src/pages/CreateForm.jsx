import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import StepCard from "../components/StepCard";

import { createForm, updateForm, getFormById } from "../services/form.service";

function CreateForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: [],
  });

  useEffect(() => {
    if (id) {
      loadForm();
    }
  }, [id]);

  const loadForm = async () => {
    try {
      const data = await getFormById(id);
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          title: "",
          questions: [],
        },
      ],
    }));
  };

  const deleteStep = (stepIndex) => {
    const steps = [...formData.steps];
    steps.splice(stepIndex, 1);
    setFormData({
      ...formData,
      steps,
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.title.trim()) {
        alert("Form name is required");
        return;
      }

      if (id) {
        await updateForm(id, formData);
      } else {
        await createForm(formData);
      }

      navigate("/forms");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1100, mx: "auto", width: "100%" }}>
        {/* Main Content Header Banner */}
        <Card
          elevation={0}
          sx={{
            p: 1.5,
            mb: 4,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "#ffffff",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
              "&:last-child": { pb: 2 },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EditNoteIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography
                  variant="h4"
                  fontWeight="800"
                  sx={{ color: "text.primary", tracking: "-0.02em" }}
                >
                  {id ? "Edit Form" : "Create Form"}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 1, pl: 7 }}
              >
                Build dynamic multi-step forms with configurable questions
              </Typography>
            </Box>

            <Button
              variant="contained"
              disableElevation
              startIcon={<SaveIcon />}
              size="large"
              onClick={handleSave}
              sx={{
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {id ? "Update Form" : "Save Form"}
            </Button>
          </CardContent>
        </Card>

        {/* Basic Meta Configuration Pane */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            mb: 5,
            bgcolor: "#ffffff",
          }}
        >
          <Stack spacing={3.5}>
            <TextField
              label="Form Name"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="e.g., Customer Feedback Survey"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Provide context or instructions for users filling out this form..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Stack>
        </Paper>

        {/* Dynamic Section Setup Controller */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{ tracking: "-0.01em" }}
            >
              Form Steps
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              Add steps and configure workflow questions
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={addStep}
            sx={{
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Add New Step
          </Button>
        </Box>

        {/* Recursive Steps Renderer Mapping Layout */}
        <Stack spacing={4}>
          {formData.steps.map((step, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#ffffff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        fontWeight: "700",
                        width: 38,
                        height: 38,
                        boxShadow: "0 4px 10px rgba(25, 118, 210, 0.25)",
                      }}
                    >
                      {index + 1}
                    </Avatar>
                    <Typography variant="h6" fontWeight="700">
                      Step {index + 1} Configuration
                    </Typography>
                  </Box>

                  <Button
                    color="error"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteStep(index)}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Delete Step
                  </Button>
                </Box>

                <StepCard
                  step={step}
                  stepIndex={index}
                  formData={formData}
                  setFormData={setFormData}
                />
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Global Footer Double Check Actions */}
        {formData.steps.length > 0 && (
          <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="large"
              disableElevation
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                borderRadius: "10px",
                px: 5,
                py: 1.6,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {id ? "Update Form Structure" : "Save Complete Form"}
            </Button>
          </Box>
        )}
      </Box>
    </MainLayout>
  );
}

export default CreateForm;
