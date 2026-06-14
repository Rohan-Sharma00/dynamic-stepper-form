import {
  Paper,
  Button,
} from "@mui/material";

function SubmissionCard({
  form,
  onStart,
}) {
  return (
    <Paper className="p-6">
      <h2 className="text-xl font-semibold">
        {form.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {form.description}
      </p>

      <p className="mt-3 text-sm">
        {form.steps.length} Steps
      </p>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() =>
          onStart(form._id)
        }
      >
        Start Form
      </Button>
    </Paper>
  );
}

export default SubmissionCard;