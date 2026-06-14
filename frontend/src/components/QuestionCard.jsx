import {
  Paper,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

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
    <Paper className="p-4 border rounded-lg">
      <div className="flex flex-col gap-4">
        <TextField
          label="Question Name"
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
          <MenuItem value="text">Text</MenuItem>

          <MenuItem value="select">Select</MenuItem>

          <MenuItem value="radio">Radio</MenuItem>
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              checked={question.required}
              onChange={(e) => updateQuestion("required", e.target.checked)}
            />
          }
          label="Required"
        />

        {question.fieldType === "text" && (
          <>
            <TextField
              label="Min Length"
              type="number"
              value={question.validations?.minLength || ""}
              onChange={(e) =>
                updateQuestion("validations", {
                  ...question.validations,
                  minLength: Number(e.target.value),
                })
              }
            />

            <TextField
              label="Max Length"
              type="number"
              value={question.validations?.maxLength || ""}
              onChange={(e) =>
                updateQuestion("validations", {
                  ...question.validations,
                  maxLength: Number(e.target.value),
                })
              }
            />
          </>
        )}

        {["select", "radio"].includes(question.fieldType) && (
          <>
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Options</h4>

              <Button size="small" variant="outlined" onClick={addOption}>
                Add Option
              </Button>
            </div>

            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex gap-2">
                <TextField
                  fullWidth
                  label={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => updateOption(optionIndex, e.target.value)}
                />

                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => deleteOption(optionIndex)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </Paper>
  );
}

export default QuestionCard;
