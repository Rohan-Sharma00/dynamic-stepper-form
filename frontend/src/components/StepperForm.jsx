import {
  Button,
  Paper,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Typography,
  Divider,
  Chip,
  Box,
  Stack,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendIcon from "@mui/icons-material/Send";

function StepperForm({
  step,
  answers,
  setAnswers,
  onNext,
  onBack,
  onSave,
  isLastStep,
  onSubmit,
}) {
  const updateAnswer = (key, value) => {
    setAnswers({
      ...answers,
      [key]: value,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Top Header Banner Block */}
      <Box
        sx={{
          background: "linear-gradient(to right, #2563eb, #4f46e5)",
          color: "white",
          p: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {step.title}
            </Typography>
            <Typography variant="body2">
              Complete all required fields in this step
            </Typography>
          </Box>

          <Chip
            label={`${step.questions.length} Questions`}
            sx={{
              bgcolor: "white",
              color: "#2563eb",
              fontWeight: "bold",
            }}
          />
        </Stack>
      </Box>

      {/* Main Questionnaire Viewport Layer */}
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          {step.questions.map((question) => (
            <Paper
              key={question.label}
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  {question.label}
                </Typography>

                {question.required && (
                  <Typography variant="caption" color="error">
                    Required
                  </Typography>
                )}
              </Box>

              {/* Text Field Conditonal Mapping */}
              {question.fieldType === "text" && (
                <TextField
                  fullWidth
                  placeholder={`Enter ${question.label}`}
                  value={answers[question.label] || ""}
                  onChange={(e) => updateAnswer(question.label, e.target.value)}
                />
              )}

              {question.fieldType === "radio" && (
                <RadioGroup
                  value={answers[question.label] || ""}
                  onChange={(e) => updateAnswer(question.label, e.target.value)}
                >
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              )}

              {question.fieldType === "select" && (
                <TextField
                  select
                  fullWidth
                  value={answers[question.label] || ""}
                  onChange={(e) => updateAnswer(question.label, e.target.value)}
                >
                  {question.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Paper>
          ))}
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Action Button Row Navigation Footer */}
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          spacing={1.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Save Draft
          </Button>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              disabled={!onBack}
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
            >
              Back
            </Button>

            {!isLastStep ? (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={onNext}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                onClick={onSubmit}
              >
                Submit Form
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export default StepperForm;