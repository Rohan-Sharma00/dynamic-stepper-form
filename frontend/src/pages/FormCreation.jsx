import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Paper,
  Typography,
  Box,
  Stack,
  Grid // Using standard Grid
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";

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
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        
        {/* Fluid Hero Header Area */}
        <Paper
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #1e40af 0%, #4338ca 50%, #6d28d9 100%)",
            p: { xs: 4, md: 5 },
            mb: 4,
            borderRadius: "20px",
            color: "#ffffff",
            boxShadow: "0 10px 30px rgba(67, 56, 202, 0.15)"
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
                <DescriptionIcon sx={{ fontSize: { xs: 36, md: 44 } }} />
                <Typography
                  variant="h3"
                  fontWeight="800"
                  letterSpacing="-0.03em"
                  sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}
                >
                  Form Management
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.85,
                  maxWidth: 600,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.5
                }}
              >
                Create, track, and manage configurable multi-step forms built with complex conditional validation workflows.
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              disableElevation
              startIcon={<AddIcon />}
              onClick={() => navigate("/forms/create")}
              sx={{
                bgcolor: "#ffffff",
                color: "#2563eb",
                fontWeight: 700,
                px: 3.5,
                py: 1.6,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#f8fafc",
                },
              }}
            >
              Create Form
            </Button>
          </Stack>
        </Paper>

        {/* Responsive Analytics KPI Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Total Forms Metric Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#ffffff",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2.5}>
                <Box 
                  sx={{ 
                    bgcolor: "rgba(37, 99, 235, 0.08)", 
                    p: 2, 
                    borderRadius: "14px",
                    display: "flex"
                  }}
                >
                  <DescriptionIcon color="primary" sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="600" sx={{ color: "text.secondary", textTransform: "uppercase", tracking: "0.05em", mb: 0.2 }}>
                    Total Forms
                  </Typography>
                  <Typography variant="h3" fontWeight="800" sx={{ color: "text.primary", lineHeight: 1 }}>
                    {forms.length}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Active Forms Metric Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#ffffff",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2.5}>
                <Box 
                  sx={{ 
                    bgcolor: "rgba(22, 163, 74, 0.08)", 
                    p: 2, 
                    borderRadius: "14px",
                    display: "flex"
                  }}
                >
                  <ChecklistIcon color="success" sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="600" sx={{ color: "text.secondary", textTransform: "uppercase", tracking: "0.05em", mb: 0.2 }}>
                    Active Status
                  </Typography>
                  <Typography variant="h3" fontWeight="800" sx={{ color: "text.primary", lineHeight: 1 }}>
                    {forms.length}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Master Form Table Data Viewport */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "divider",
            p: { xs: 3, md: 4 },
            bgcolor: "#ffffff"
          }}
        >
          <Box sx={{ mb: 3.5 }}>
            <Typography variant="h5" fontWeight="800" sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
              Active Form Schemas
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              Modify system fields, view configuration histories, or delete inactive workflows.
            </Typography>
          </Box>

          <FormTable forms={forms} onDelete={handleDelete} />
        </Paper>
        
      </Box>
    </MainLayout>
  );
}

export default FormCreation;