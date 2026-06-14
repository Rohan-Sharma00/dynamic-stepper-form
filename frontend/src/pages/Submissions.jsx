import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getForms } from "../services/form.service";

import {
  createSubmission,
  getSubmissions,
  deleteSubmission,
} from "../services/submission.service";

function Submissions() {
  const navigate = useNavigate();

  const [forms, setForms] = useState([]);
  const [submissions, setSubmissions] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [selectedForm, setSelectedForm] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const formsData =
        await getForms();

      const submissionsData =
        await getSubmissions();

      setForms(formsData);
      setSubmissions(
        submissionsData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSubmission =
    async () => {
      if (!selectedForm) {
        return;
      }

      try {
        const submission =
          await createSubmission({
            formId:
              selectedForm,
          });

        setOpen(false);

        navigate(
          `/submissions/${submission._id}`
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete this submission?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteSubmission(id);

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Submissions
        </h1>

        <Button
          variant="contained"
          onClick={() =>
            setOpen(true)
          }
        >
          New Submission
        </Button>
      </div>

      <Paper className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Sr No
              </th>

              <th className="p-4 text-left">
                Form Name
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Progress
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center"
                >
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map(
                (
                  submission,
                  index
                ) => (
                  <tr
                    key={
                      submission._id
                    }
                    className="border-t"
                  >
                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      {
                        submission
                          .formId
                          ?.title
                      }
                    </td>

                    <td className="p-4">
                      <span
                        className={
                          submission.status ===
                          "completed"
                            ? "text-green-600 font-semibold"
                            : "text-orange-600 font-semibold"
                        }
                      >
                        {
                          submission.status
                        }
                      </span>
                    </td>

                    <td className="p-4">
                      {
                        submission.completedSteps
                      }
                      /
                      {
                        submission
                          .formId
                          ?.steps
                          ?.length
                      }
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            navigate(
                              `/submissions/${submission._id}`
                            )
                          }
                        >
                          {submission.status ===
                          "completed"
                            ? "View"
                            : "Resume"}
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={
                            <DeleteIcon />
                          }
                          onClick={() =>
                            handleDelete(
                              submission._id
                            )
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </Paper>

      <Dialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
      >
        <DialogTitle>
          Create Submission
        </DialogTitle>

        <DialogContent>
          <TextField
            select
            fullWidth
            label="Select Form"
            sx={{ mt: 2 }}
            value={
              selectedForm
            }
            onChange={(e) =>
              setSelectedForm(
                e.target.value
              )
            }
          >
            {forms.map(
              (form) => (
                <MenuItem
                  key={
                    form._id
                  }
                  value={
                    form._id
                  }
                >
                  {form.title}
                </MenuItem>
              )
            )}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={
              handleCreateSubmission
            }
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}

export default Submissions;