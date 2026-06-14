import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import StepperForm from "../components/StepperForm";
import StepperHeader from "../components/StepperHeader";

import {
  getSubmissionById,
  saveDraft,
  submitSubmission,
} from "../services/submission.service";

function FillSubmission() {
  const navigate =
    useNavigate();

  const { id } = useParams();

  const [submission, setSubmission] =
    useState(null);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [completedSteps, setCompletedSteps] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  useEffect(() => {
    loadSubmission();
  }, []);

  const loadSubmission =
    async () => {
      try {
        const data =
          await getSubmissionById(id);

        setSubmission(data);

        setCurrentStep(
          data.currentStep || 0
        );

        setCompletedSteps(
          data.completedSteps || 0
        );

        setAnswers(
          data.answers || {}
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSaveDraft =
    async () => {
      try {
        const completed =
          Math.max(
            completedSteps,
            currentStep + 1
          );

        await saveDraft(id, {
          answers,
          currentStep,
          completedSteps:
            completed,
        });

        setCompletedSteps(
          completed
        );

        alert(
          "Draft saved successfully"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const validateCurrentStep =
    () => {
      const step =
        submission.formId.steps[
          currentStep
        ];

      for (const question of step.questions) {
        if (
          question.required &&
          !answers[
            question.label
          ]
        ) {
          alert(
            `${question.label} is required`
          );

          return false;
        }
      }

      return true;
    };

  const handleNext = () => {
    if (
      !validateCurrentStep()
    ) {
      return;
    }

    setCompletedSteps(
      Math.max(
        completedSteps,
        currentStep + 1
      )
    );

    setCurrentStep(
      (prev) =>
        Math.min(
          prev + 1,
          submission.formId.steps
            .length - 1
        )
    );
  };

  const handleBack = () => {
    setCurrentStep(
      (prev) =>
        Math.max(prev - 1, 0)
    );
  };

  const handleSubmit =
    async () => {
      if (
        !validateCurrentStep()
      ) {
        return;
      }

      try {
        await submitSubmission(
          id,
          {
            answers,
            currentStep,
            completedSteps:
              submission.formId.steps
                .length,
          }
        );

        alert(
          "Form submitted successfully"
        );

        navigate(
          "/submissions"
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!submission) {
    return (
      <MainLayout>
        <div className="p-10">
          Loading...
        </div>
      </MainLayout>
    );
  }

  const steps =
    submission.formId.steps;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            {
              submission.formId
                .title
            }
          </h1>

          <p className="text-gray-500 mt-2">
            {
              submission.formId
                .description
            }
          </p>
        </div>

        <StepperHeader
          steps={steps}
          currentStep={
            currentStep
          }
          completedSteps={
            completedSteps
          }
          setCurrentStep={
            setCurrentStep
          }
        />

        <StepperForm
          step={
            steps[currentStep]
          }
          answers={answers}
          setAnswers={setAnswers}
          onSave={
            handleSaveDraft
          }
          onBack={
            currentStep > 0
              ? handleBack
              : null
          }
          onNext={
            handleNext
          }
          isLastStep={
            currentStep ===
            steps.length - 1
          }
          onSubmit={
            handleSubmit
          }
        />
      </div>
    </MainLayout>
  );
}

export default FillSubmission;