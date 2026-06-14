import {
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Chip,
  Box,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";

import QuestionCard from "./QuestionCard";

function StepCard({
  step,
  stepIndex,
  formData,
  setFormData,
}) {
  const updateStepTitle = (value) => {
    const steps = [...formData.steps];
    steps[stepIndex].title = value;

    setFormData({
      ...formData,
      steps,
    });
  };

  const addQuestion = () => {
    const steps = [...formData.steps];
    steps[stepIndex].questions.push({
      label: "",
      fieldType: "text",
      required: false,
      options: [],
    });

    setFormData({
      ...formData,
      steps,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#ffffff"
      }}
    >
      {/* Fluid Header Banner Wrapper */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          color: "#ffffff",
          p: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ViewTimelineIcon sx={{ fontSize: 28 }} />
            <Box>
              <Typography
                variant="h5"
                fontWeight="800"
                sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                Step {stepIndex + 1}
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.85, mt: 0.2 }}
              >
                Configure step details and questions
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={`${step.questions.length} Questions`}
            size="small"
            sx={{
              bgcolor: "#ffffff",
              color: "#2563eb",
              fontWeight: 700,
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          />
        </Stack>
      </Box>

      {/* Main Form Content Viewport */}
      <Box sx={{ p: 4 }}>
        <TextField
          label="Step Name"
          placeholder="e.g., Personal Information"
          fullWidth
          value={step.title}
          onChange={(e) => updateStepTitle(e.target.value)}
          slotProps={{
            htmlInput: { sx: { fontWeight: 500 } }
          }}
        />

        <Divider sx={{ my: 4 }} />

        {/* Section Sub-Header Mapping Layout */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="800"
              sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
            >
              Questions
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Manage questions for this workflow step
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            onClick={addQuestion}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              whiteSpace: "nowrap"
            }}
          >
            Add Question
          </Button>
        </Stack>

        {/* Questions Loop / Dynamic Fallback Viewport */}
        {step.questions.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: "14px",
              bgcolor: "#f8fafc",
              borderStyle: "dashed"
            }}
          >
            <Typography
              variant="body2"
              fontWeight="500"
              color="text.secondary"
            >
              No questions added to this section step yet.
            </Typography>

            <Button
              sx={{ mt: 2, textTransform: "none", fontWeight: 600, borderRadius: "6px" }}
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={addQuestion}
            >
              Add First Question
            </Button>
          </Paper>
        ) : (
          <Stack spacing={3}>
            {step.questions.map((question, questionIndex) => (
              <QuestionCard
                key={questionIndex}
                question={question}
                questionIndex={questionIndex}
                stepIndex={stepIndex}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
}

export default StepCard;