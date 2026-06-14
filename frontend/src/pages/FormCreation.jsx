import { Button, Paper } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import FormTable from "../components/FormTable";

function FormCreation() {
  const forms = [
    {
      _id: 1,
      title: "Wellness Form",
      steps: [{}, {}, {}],
      createdAt: "Today",
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Form Creation
        </h1>

        <Button variant="contained">
          Create New Form
        </Button>
      </div>

      <Paper>
        <FormTable forms={forms} />
      </Paper>
    </MainLayout>
  );
}

export default FormCreation;