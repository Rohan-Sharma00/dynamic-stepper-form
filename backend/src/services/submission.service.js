const mongoose = require("mongoose");
const submissionRepository = require(
  "../repositories/submission.repository"
);
const Form = require("../models/Form");

class SubmissionService {
  async validateSubmission(
    formId,
    currentStep,
    completedSteps,
    answers = {},
    validateRequired = false
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(
        formId
      )
    ) {
      throw new Error("Invalid form id");
    }

    const form = await Form.findById(
      formId
    );

    if (!form) {
      throw new Error("Form not found");
    }

    if (
      !Array.isArray(form.steps) ||
      form.steps.length === 0
    ) {
      throw new Error(
        "Broken form configuration"
      );
    }

    if (
      currentStep < 0 ||
      currentStep >= form.steps.length
    ) {
      throw new Error("Invalid step");
    }

    if (
      completedSteps < 0 ||
      completedSteps > form.steps.length
    ) {
      throw new Error(
        "Invalid completed steps"
      );
    }

    if (validateRequired) {
      for (const step of form.steps) {
        for (const question of step.questions) {
          const answer =
            answers?.[question.label];

          if (
            question.required &&
            (!answer ||
              answer
                .toString()
                .trim() === "")
          ) {
            throw new Error(
              `${question.label} is required`
            );
          }

          if (
            (question.fieldType ===
              "select" ||
              question.fieldType ===
                "radio") &&
            answer &&
            !question.options.includes(
              answer
            )
          ) {
            throw new Error(
              `Invalid value for ${question.label}`
            );
          }
        }
      }
    }

    return form;
  }

  async create(data) {
    await this.validateSubmission(
      data.formId,
      data.currentStep || 0,
      data.completedSteps || 0,
      data.answers || {}
    );

    return submissionRepository.create(
      data
    );
  }

  getAll() {
    return submissionRepository.findAll();
  }

  getById(id) {
    return submissionRepository.findById(
      id
    );
  }

  async saveDraft(id, data) {
    const submission =
      await submissionRepository.findById(
        id
      );

    if (!submission) {
      throw new Error(
        "Submission not found"
      );
    }

    await this.validateSubmission(
      submission.formId._id ||
        submission.formId,
      data.currentStep,
      data.completedSteps,
      data.answers
    );

    return submissionRepository.update(
      id,
      {
        answers: data.answers,
        currentStep:
          data.currentStep,
        completedSteps:
          data.completedSteps,
        status: "draft",
      }
    );
  }

  async submit(id, data) {
    const submission =
      await submissionRepository.findById(
        id
      );

    if (!submission) {
      throw new Error(
        "Submission not found"
      );
    }

    await this.validateSubmission(
      submission.formId._id ||
        submission.formId,
      data.currentStep,
      data.completedSteps,
      data.answers,
      true
    );

    return submissionRepository.update(
      id,
      {
        answers: data.answers,
        currentStep:
          data.currentStep,
        completedSteps:
          data.completedSteps,
        status: "completed",
      }
    );
  }

  delete(id) {
    return submissionRepository.delete(
      id
    );
  }
}

module.exports =
  new SubmissionService();