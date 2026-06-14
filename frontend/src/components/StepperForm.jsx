import {
  Button,
  Paper,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

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
  const updateAnswer = (
    key,
    value
  ) => {
    setAnswers({
      ...answers,
      [key]: value,
    });
  };

  return (
    <Paper className="p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {step.title}
      </h2>

      <div className="flex flex-col gap-6">
        {step.questions.map(
          (question) => (
            <div
              key={question.label}
            >
              {question.fieldType ===
                "text" && (
                <TextField
                  fullWidth
                  label={
                    question.label
                  }
                  required={
                    question.required
                  }
                  value={
                    answers[
                      question.label
                    ] || ""
                  }
                  onChange={(e) =>
                    updateAnswer(
                      question.label,
                      e.target.value
                    )
                  }
                />
              )}

              {question.fieldType ===
                "radio" && (
                <>
                  <label className="block mb-2 font-medium">
                    {
                      question.label
                    }
                  </label>

                  <RadioGroup
                    value={
                      answers[
                        question.label
                      ] || ""
                    }
                    onChange={(e) =>
                      updateAnswer(
                        question.label,
                        e.target.value
                      )
                    }
                  >
                    {question.options.map(
                      (
                        option
                      ) => (
                        <FormControlLabel
                          key={
                            option
                          }
                          value={
                            option
                          }
                          control={
                            <Radio />
                          }
                          label={
                            option
                          }
                        />
                      )
                    )}
                  </RadioGroup>
                </>
              )}

              {question.fieldType ===
                "select" && (
                <TextField
                  select
                  fullWidth
                  label={
                    question.label
                  }
                  required={
                    question.required
                  }
                  value={
                    answers[
                      question.label
                    ] || ""
                  }
                  onChange={(e) =>
                    updateAnswer(
                      question.label,
                      e.target.value
                    )
                  }
                >
                  {question.options.map(
                    (
                      option
                    ) => (
                      <MenuItem
                        key={
                          option
                        }
                        value={
                          option
                        }
                      >
                        {option}
                      </MenuItem>
                    )
                  )}
                </TextField>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex gap-3 mt-8">
        <Button
          variant="outlined"
          onClick={onSave}
        >
          Save Draft
        </Button>

        <Button
          variant="outlined"
          disabled={!onBack}
          onClick={onBack}
        >
          Back
        </Button>

        {!isLastStep ? (
          <Button
            variant="contained"
            onClick={onNext}
          >
            Save & Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onSubmit}
          >
            Submit Form
          </Button>
        )}
      </div>
    </Paper>
  );
}

export default StepperForm;