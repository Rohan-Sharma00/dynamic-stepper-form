import {
  Paper,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";

function StepperHeader({
  steps,
  currentStep,
  completedSteps = 0,
  setCurrentStep,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 4,
      }}
    >
      {/* Title & Metadata Header Block */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Form Progress
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Navigate between completed steps
        </Typography>
      </Box>

      {/* Custom Horizontal Progress Bar Tracker */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        spacing={2}
        sx={{ width: "100%", overflowX: "auto", py: 1 }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < completedSteps;
          const isActive = index === currentStep;
          const isAccessible = index <= completedSteps;

          return (
            <Box 
              key={index} 
              sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                minWidth: "100px"
              }}
            >
              <Button
                disabled={!isAccessible}
                onClick={() => setCurrentStep(index)}
                variant={isActive ? "contained" : isCompleted ? "soft" : "outlined"}
                color={isActive ? "primary" : isCompleted ? "success" : "inherit"}
                sx={{
                  minWidth: 40,
                  height: 40,
                  borderRadius: "50%",
                  fontWeight: "bold",
                  mb: 1,
                  p: 0,
                  // Custom border style treatments to visually stand out without MUI Stepper
                  border: isActive ? "2px solid #2563eb" : "1px solid rgba(0,0,0,0.23)"
                }}
              >
                {index + 1}
              </Button>

              <Typography
                variant="caption"
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "primary.main" : isCompleted ? "success.main" : "text.secondary"}
                textAlign="center"
              >
                {step.title || `Step ${index + 1}`}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
}

export default StepperHeader;