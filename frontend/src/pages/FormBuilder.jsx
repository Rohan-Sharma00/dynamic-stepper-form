import {
  Button,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

function FormBuilder() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "#ffffff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
        }}
      >
        {/* Modernized Header Panel with Linear Gradient */}
        <Box 
          sx={{ 
            background: "linear-gradient(135deg, #1e40af 0%, #4338ca 50%, #6d28d9 100%)", // slate-infused modern premium gradient
            p: { xs: 4, md: 6 }, 
            color: "#ffffff" 
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 2 }}>
            <DynamicFormIcon
              sx={{
                fontSize: { xs: 40, md: 48 },
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))"
              }}
            />

            <Typography
              variant="h3"
              fontWeight="800"
              letterSpacing="-0.03em"
              sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}
            >
              Form Builder
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight="400"
            sx={{
              opacity: 0.85,
              maxWidth: 600,
              lineHeight: 1.5,
              fontSize: { xs: "0.95rem", md: "1.125rem" },
              letterSpacing: "0.01em"
            }}
          >
            Create dynamic multi-step forms with configurable questions,
            validations and structured data workflows.
          </Typography>
        </Box>

        {/* Lower Call to Action Workspace Content */}
        <Box sx={{ p: { xs: 4, md: 6 } }}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
            justifyContent="space-between"
            alignItems={{
              xs: "stretch",
              sm: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{ letterSpacing: "-0.01em", color: "text.primary", mb: 0.5 }}
              >
                Start Building
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.6 }}
              >
                Add conditional configuration steps, fields and customized inline validation rules.
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              disableElevation
              startIcon={<AddIcon />}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.8,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                whiteSpace: "nowrap"
              }}
            >
              Create New Form
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default FormBuilder;