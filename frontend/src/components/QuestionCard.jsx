import {
  Paper,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Divider,
  Chip,
  Box,
  Stack,
  Grid, // Standard legacy-engine variant compatible with your configuration
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";

function QuestionCard({
  question,
  questionIndex,
  stepIndex,
  formData,
  setFormData,
}) {
  const updateQuestion = (key, value) => {
    const steps = [...formData.steps];
    steps[stepIndex].questions[questionIndex][key] = value;

    setFormData({
      ...formData,
      steps,
    });
  };

  const addOption = () => {
    const steps = [...formData.steps];
    steps[stepIndex].questions[questionIndex].options.push("");

    setFormData({
      ...formData,
      steps,
    });
  };

  const updateOption = (optionIndex, value) => {
    const steps = [...formData.steps];
    steps[stepIndex].questions[questionIndex].options[optionIndex] = value;

    setFormData({
      ...formData,
      steps,
    });
  };

  const deleteOption = (optionIndex) => {
    const steps = [...formData.steps];
    steps[stepIndex].questions[questionIndex].options.splice(optionIndex, 1);

    setFormData({
      ...formData,
      steps,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#ffffff",
      }}
    >
      {/* Header Alignment Wrapper */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <QuizIcon color="primary" />
          <Typography variant="h6" fontWeight="800" sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
            Question {questionIndex + 1}
          </Typography>
        </Stack>

        <Chip
          label={question.required ? "Required" : "Optional"}
          color={question.required ? "error" : "default"}
          size="small"
          sx={{ fontWeight: 600, borderRadius: "6px" }}
        />
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Primary Form Input Container */}
      <Stack spacing={3}>
        <TextField
          label="Question Label"
          placeholder="e.g., Enter your work email address"
          fullWidth
          value={question.label}
          onChange={(e) => updateQuestion("label", e.target.value)}
        />

        <TextField
          select
          label="Field Type"
          fullWidth
          value={question.fieldType}
          onChange={(e) => updateQuestion("fieldType", e.target.value)}
        >
          <MenuItem value="text">Text Field</MenuItem>
          <MenuItem value="select">Dropdown</MenuItem>
          <MenuItem value="radio">Radio Group</MenuItem>
        </TextField>

        <Box sx={{ mt: -1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={question.required || false}
                onChange={(e) => updateQuestion("required", e.target.checked)}
              />
            }
            label={
              <Typography variant="body2" fontWeight="500" sx={{ color: "text.primary" }}>
                Required Field
              </Typography>
            }
          />
        </Box>

        {/* Validation Rules Section (Text Fields Only) */}
        {question.fieldType === "text" && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" fontWeight="700" sx={{ color: "text.secondary", textTransform: "uppercase", tracking: "0.05em" }}>
              Validation Rules
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Min Length"
                  type="number"
                  fullWidth
                  value={question.validations?.minLength ?? ""}
                  onChange={(e) =>
                    updateQuestion("validations", {
                      ...question.validations,
                      minLength: e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Max Length"
                  type="number"
                  fullWidth
                  value={question.validations?.maxLength ?? ""}
                  onChange={(e) =>
                    updateQuestion("validations", {
                      ...question.validations,
                      maxLength: e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        )}

        {/* Dynamic Option Management Block (Dropdowns & Radio Selects) */}
        {["select", "radio"].includes(question.fieldType) && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" fontWeight="700" sx={{ color: "text.secondary", textTransform: "uppercase", tracking: "0.05em" }}>
                Options Config
              </Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={addOption}
                className="relative -bottom-[5px] ml-4 font-semibold normal-case rounded-[6px]"
              >
                Add Option
              </Button>
            </Stack>

            {/* Dynamic Option Rows Loop */}
            <Stack spacing={1.5}>
              {question.options?.map((option, optionIndex) => (
                <Stack direction="row" spacing={1.5} alignItems="center" key={optionIndex}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`Option ${optionIndex + 1}`}
                    placeholder="Enter choice value"
                    value={option}
                    onChange={(e) => updateOption(optionIndex, e.target.value)}
                  />

                  <IconButton
                    color="error"
                    onClick={() => deleteOption(optionIndex)}
                    sx={{
                      border: "1px solid",
                      borderColor: "error.light",
                      borderRadius: "8px",
                      p: "7px",
                      "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default QuestionCard;