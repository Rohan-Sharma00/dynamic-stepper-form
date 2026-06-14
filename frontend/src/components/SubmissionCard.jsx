import {
  Paper,
  Button,
  Chip,
  Typography,
  Avatar,
  Box,
  Stack,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function SubmissionCard({
  form,
  onStart,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        p: 3,
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
        },
      }}
    >
      {/* Top Media Avatar & Step Count Status Header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
        >
          <Avatar
            sx={{
              bgcolor: "#dbeafe",
              color: "#2563eb",
            }}
          >
            <AssignmentIcon />
          </Avatar>

          <Chip
            label={`${form.steps.length} Steps`}
            color="primary"
            size="small"
          />
        </Stack>
      </Box>

      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
      >
        {form.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          minHeight: 50,
          mb: 3,
        }}
      >
        {form.description || "No description available"}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={() => onStart(form._id)}
        sx={{
          borderRadius: 3,
          py: 1.2,
        }}
      >
        Start Form
      </Button>
    </Paper>
  );
}

export default SubmissionCard;