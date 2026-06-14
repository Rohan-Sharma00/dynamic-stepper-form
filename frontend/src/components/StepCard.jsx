import {
  Paper,
  TextField,
  Button,
} from "@mui/material";

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
    <Paper className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Step {stepIndex + 1}
      </h2>

      <TextField
        label="Step Name"
        fullWidth
        value={step.title}
        onChange={(e) =>
          updateStepTitle(
            e.target.value
          )
        }
      />

      <Button
        sx={{ mt: 2 }}
        variant="outlined"
        onClick={addQuestion}
      >
        Add Question
      </Button>

      <div className="mt-4 flex flex-col gap-4">
        {step.questions.map(
          (question, questionIndex) => (
            <QuestionCard
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
              stepIndex={stepIndex}
              formData={formData}
              setFormData={setFormData}
            />
          )
        )}
      </div>
    </Paper>
  );
}

export default StepCard;