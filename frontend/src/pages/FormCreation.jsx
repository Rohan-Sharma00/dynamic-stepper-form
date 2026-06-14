import { useState } from "react";
import { Button } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import CreateFormDialog from "../components/CreateFormDialog";

function FormCreation() {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Form Creation
          </h1>

          <p className="text-slate-500">
            Create and manage forms
          </p>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Create New Form
        </Button>
      </div>

      <CreateFormDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </MainLayout>
  );
}

export default FormCreation;