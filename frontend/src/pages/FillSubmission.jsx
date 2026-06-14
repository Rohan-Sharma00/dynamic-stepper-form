import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
  CircularProgress
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import MainLayout from "../layouts/MainLayout";
import StepperForm from "../components/StepperForm";
import StepperHeader from "../components/StepperHeader";

import {
  getSubmissionById,
  saveDraft,
  submitSubmission,
} from "../services/submission.service";

function FillSubmission() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [submission, setSubmission] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadSubmission();
  }, []);

  const loadSubmission = async () => {
    try {
      const data = await getSubmissionById(id);

      setSubmission(data);
      setCurrentStep(data.currentStep || 0);
      setCompletedSteps(data.completedSteps || 0);
      setAnswers(data.answers || {} );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const completed = Math.max(completedSteps, currentStep + 1);

      await saveDraft(id, {
        answers,
        currentStep,
        completedSteps: completed,
      });

      setCompletedSteps(completed);
      alert("Draft saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const validateCurrentStep = () => {
    const step = submission.formId.steps[currentStep];

    for (const question of step.questions) {
      if (question.required && !answers[question.label]) {
        alert(`${question.label} is required`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCompletedSteps(Math.max(completedSteps, currentStep + 1));
    setCurrentStep((prev) => Math.min(prev + 1, submission.formId.steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    try {
      await submitSubmission(id, {
        answers,
        currentStep,
        completedSteps: submission.formId.steps.length,
      });

      alert("Form submitted successfully");
      navigate("/submissions");
    } catch (error) {
      console.log(error);
    }
  };

  // Modernized Loading Fallback using MUI
  if (!submission) {
    return (
      <MainLayout>
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center", 
            minHeight: "50vh",
            gap: 2
          }}
        >
          <CircularProgress size={44} thickness={4} />
          <Typography variant="body1" fontWeight="500" sx={{ color: "text.secondary" }}>
            Retrieving submission content...
          </Typography>
        </Box>
      </MainLayout>
    );
  }

  const steps = submission.formId.steps;
  const progress = Math.round((completedSteps / steps.length) * 100) || 0;

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1100, mx: "auto", width: "100%" }}>
        
        {/* Header Info Dashboard Block */}
        <Card 
          elevation={0} 
          sx={{ 
            p: 1.5, 
            mb: 4, 
            borderRadius: "16px", 
            border: "1px solid", 
            borderColor: "divider",
            bgcolor: "#ffffff"
          }}
        >
          <CardContent sx={{ "&:last-child": { pb: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
              <Box sx={{ flexGrow: 1, pr: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AssignmentIcon color="primary" sx={{ fontSize: 36 }} />
                  <Typography variant="h4" fontWeight="800" sx={{ color: "text.primary", tracking: "-0.02em" }}>
                    {submission.formId.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, pl: 6.5, maxWidth: 750 }}>
                  {submission.formId.description}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right", minWidth: 120 }}>
                <Typography variant="caption" fontWeight="600" sx={{ color: "text.secondary", textTransform: "uppercase", tracking: "0.05em" }}>
                  Progress Completion
                </Typography>
                <Typography variant="h3" fontWeight="800" sx={{ color: "primary.main", mt: 0.5, lineHeight: 1 }}>
                  {progress}%
                </Typography>
              </Box>
            </Box>

            {/* Custom Styled Native Material UI Progress Indicator */}
            <Box sx={{ pl: 6.5, mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  bgcolor: "#f1f5f9", // slate-100
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    background: "linear-gradient(90deg, #3b82f6, #2563eb)"
                  }
                }}
              />
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, color: "#16a34a" }}>
                <CheckCircleIcon sx={{ fontSize: 18 }} />
                <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: 13 }}>
                  {completedSteps} of {steps.length} steps completed
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Stepper Header Container */}
        <Card 
          elevation={0} 
          sx={{ 
            p: 1, 
            mb: 4, 
            borderRadius: "16px", 
            border: "1px solid", 
            borderColor: "divider",
            bgcolor: "#ffffff"
          }}
        >
          <CardContent sx={{ "&:last-child": { pb: 2 } }}>
            <StepperHeader
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              setCurrentStep={setCurrentStep}
            />
          </CardContent>
        </Card>

        {/* Main Content Form Engine Injection */}
        <Box sx={{ mt: 2 }}>
          <StepperForm
            step={steps[currentStep]}
            answers={answers}
            setAnswers={setAnswers}
            onSave={handleSaveDraft}
            onBack={currentStep > 0 ? handleBack : null}
            onNext={handleNext}
            isLastStep={currentStep === steps.length - 1}
            onSubmit={handleSubmit}
          />
        </Box>

      </Box>
    </MainLayout>
  );
}

export default FillSubmission;