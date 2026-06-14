import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Chip,
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid, // Switched from Grid2 to standard Grid
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

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
  const [submissions, setSubmissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const formsData = await getForms();
      const submissionsData = await getSubmissions();

      setForms(formsData);
      setSubmissions(submissionsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSubmission = async () => {
    if (!selectedForm) return;

    try {
      const submission = await createSubmission({ formId: selectedForm });
      setOpen(false);
      navigate(`/submissions/${submission._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this submission?");
    if (!confirmed) return;

    try {
      await deleteSubmission(id);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const draftCount = submissions.filter((s) => s.status === "draft").length;
  const completedCount = submissions.filter((s) => s.status === "completed").length;

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        
        {/* Dashboard Header Panel */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "#ffffff",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ color: "text.primary", letterSpacing: "-0.02em" }}>
                Submission Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                Track and manage runtime multi-step form submissions.
              </Typography>
            </Box>

            <Button
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              size="large"
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1.2,
              }}
            >
              New Submission
            </Button>
          </Stack>
        </Paper>

        {/* Analytics Summary Subgrid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Card: Total */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider" }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: "rgba(37, 99, 235, 0.08)", p: 1.5, borderRadius: "12px", display: "flex" }}>
                  <DashboardIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Total</Typography>
                  <Typography variant="h4" fontWeight="800" sx={{ mt: 0.5 }}>{submissions.length}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Card: Drafts */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider" }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: "rgba(237, 108, 2, 0.08)", p: 1.5, borderRadius: "12px", display: "flex" }}>
                  <EditNoteIcon color="warning" />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Drafts</Typography>
                  <Typography variant="h4" fontWeight="800" sx={{ mt: 0.5 }}>{draftCount}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Card: Completed */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider" }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: "rgba(46, 125, 50, 0.08)", p: 1.5, borderRadius: "12px", display: "flex" }}>
                  <AssignmentTurnedInIcon color="success" />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Completed</Typography>
                  <Typography variant="h4" fontWeight="800" sx={{ mt: 0.5 }}>{completedCount}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Master Submissions Core Table Viewport */}
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            borderRadius: "16px", 
            border: "1px solid", 
            borderColor: "divider",
            overflow: "hidden"
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Form Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ color: "text.primary" }}>
                      No submissions yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Create your first submission to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((submission, index) => (
                  <TableRow 
                    key={submission._id}
                    sx={{ "&:hover": { bgcolor: "#f1f5f9" }, transition: "background-color 0.2s" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{submission.formId?.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={submission.status}
                        color={submission.status === "completed" ? "success" : "warning"}
                        size="small"
                        sx={{ fontWeight: 600, textTransform: "capitalize", borderRadius: "6px" }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500, color: "text.secondary" }}>
                      {submission.completedSteps} / {submission.formId?.steps?.length || 0}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1.5}>
                        <Button
                          size="small"
                          variant="contained"
                          disableElevation
                          onClick={() => navigate(`/submissions/${submission._id}`)}
                          sx={{ textTransform: "none", borderRadius: "6px", fontWeight: 600 }}
                        >
                          {submission.status === "completed" ? "View" : "Resume"}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(submission._id)}
                          sx={{ textTransform: "none", borderRadius: "6px", fontWeight: 600 }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal Selection Dialog Wrapper */}
        <Dialog 
          open={open} 
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: { borderRadius: "16px", p: 1, width: "100%", maxWidth: "450px" }
          }}
        >
          <DialogTitle fontWeight="700" sx={{ pb: 1 }}>
            Create Submission
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select a deployed schema to initiate a new multi-step tracking instance.
            </Typography>
            <TextField
              select
              fullWidth
              label="Select Form"
              variant="outlined"
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
            >
              {forms.map((form) => (
                <MenuItem key={form._id} value={form._id}>
                  {form.title}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setOpen(false)}
              sx={{ textTransform: "none", fontWeight: 600, color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={handleCreateSubmission}
              disabled={!selectedForm}
              sx={{ textTransform: "none", fontWeight: 600, borderRadius: "8px", px: 3 }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </MainLayout>
  );
}

export default Submissions;