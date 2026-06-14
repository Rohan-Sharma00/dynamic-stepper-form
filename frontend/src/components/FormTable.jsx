import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Chip,
  Tooltip,
  TableContainer,
  Typography,
  Avatar,
  Box,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

import { useNavigate } from "react-router-dom";

function FormTable({ forms, onDelete }) {
  const navigate = useNavigate();

  // Empty Viewport Fallback
  if (forms.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: { xs: 6, md: 8 },
          borderRadius: "16px",
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "#ffffff"
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 3,
            bgcolor: "rgba(37, 99, 235, 0.08)",
            color: "primary.main",
          }}
        >
          <DescriptionIcon sx={{ fontSize: 40 }} />
        </Avatar>

        <Typography variant="h5" fontWeight="800" sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
          No Forms Found
        </Typography>

        <Typography color="text.secondary" variant="body2" sx={{ mt: 1, maxWidth: 400, mx: "auto" }}>
          Create your first dynamic layout structure workflow schema to get started.
        </Typography>
      </Paper>
    );
  }

  return (
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
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f8fafc" }}>
            <TableCell sx={{ fontWeight: 700, color: "text.primary", py: 2 }}>
              Form
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.primary", py: 2 }}>
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.primary", py: 2 }}>
              Steps
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, color: "text.primary", py: 2 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {forms.map((form) => (
            <TableRow
              key={form._id}
              sx={{
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: "#f1f5f9",
                },
              }}
            >
              {/* Form Metadata Column */}
              <TableCell sx={{ py: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(37, 99, 235, 0.08)",
                      color: "primary.main",
                      width: 42,
                      height: 42
                    }}
                  >
                    <DynamicFormIcon sx={{ fontSize: 22 }} />
                  </Avatar>

                  <Box>
                    <Typography variant="body1" fontWeight="600" sx={{ color: "text.primary", lineHeight: 1.3 }}>
                      {form.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.2, display: "block" }}>
                      Dynamic Form
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>

              {/* Description Column */}
              <TableCell sx={{ py: 2, maxWidth: 300 }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {form.description || "No description provided"}
                </Typography>
              </TableCell>

              {/* Step Badging Column */}
              <TableCell sx={{ py: 2 }}>
                <Chip
                  label={`${form.steps?.length || 0} Steps`}
                  color="primary"
                  variant="combined"
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: "6px" }}
                />
              </TableCell>

              {/* Functional Interaction Row Anchors */}
              <TableCell align="center" sx={{ py: 2 }}>
                <Stack direction="row" justifyContent="center" spacing={0.5}>
                  <Tooltip title="Edit Form" arrow>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => navigate(`/forms/edit/${form._id}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Form" arrow>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => onDelete(form._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FormTable;