import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import StepCard from "../components/StepCard";

import {
  createForm,
  updateForm,
  getFormById,
} from "../services/form.service";

function CreateForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      steps: [],
    });

  useEffect(() => {
    if (id) {
      loadForm();
    }
  }, [id]);

  const loadForm = async () => {
    try {
      const data =
        await getFormById(id);

      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          title: "",
          questions: [],
        },
      ],
    }));
  };

  const deleteStep = (stepIndex) => {
    const steps = [...formData.steps];

    steps.splice(stepIndex, 1);

    setFormData({
      ...formData,
      steps,
    });
  };

  const handleSave = async () => {
    try {
      if (
        !formData.title.trim()
      ) {
        alert(
          "Form name is required"
        );
        return;
      }

      if (id) {
        await updateForm(
          id,
          formData
        );
      } else {
        await createForm(
          formData
        );
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">
            {id
              ? "Edit Form"
              : "Create Form"}
          </h1>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {id
              ? "Update Form"
              : "Save Form"}
          </Button>
        </div>

        <Paper className="p-6 mb-6">
          <div className="flex flex-col gap-4">
            <TextField
              label="Form Name"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title:
                    e.target.value,
                })
              }
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={
                formData.description
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
            />
          </div>
        </Paper>

        <div className="mb-6">
          <Button
            variant="outlined"
            onClick={addStep}
          >
            Add Step
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {formData.steps.map(
            (step, index) => (
              <div
                key={index}
              >
                <div className="flex justify-end mb-2">
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      deleteStep(
                        index
                      )
                    }
                  >
                    Delete Step
                  </Button>
                </div>

                <StepCard
                  step={step}
                  stepIndex={
                    index
                  }
                  formData={
                    formData
                  }
                  setFormData={
                    setFormData
                  }
                />
              </div>
            )
          )}
        </div>

        {formData.steps.length >
          0 && (
          <div className="mt-8 flex justify-end">
            <Button
              variant="contained"
              size="large"
              onClick={
                handleSave
              }
            >
              {id
                ? "Update Form"
                : "Save Form"}
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default CreateForm;