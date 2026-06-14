import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import FormTable from "../components/FormTable";

import {
  getForms,
  deleteForm,
} from "../services/form.service";

function FormCreation() {
  const navigate = useNavigate();

  const [forms, setForms] = useState([]);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const data = await getForms();
      setForms(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteForm(id);
      loadForms();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Form Creation
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage dynamic forms
          </p>
        </div>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/forms/create")
          }
        >
          Create New Form
        </Button>
      </div>

      <FormTable
        forms={forms}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

export default FormCreation;