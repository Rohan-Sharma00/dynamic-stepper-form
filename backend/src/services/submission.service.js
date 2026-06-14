const submissionRepository = require(
  "../repositories/submission.repository"
);

class SubmissionService {
  create(data) {
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

  saveDraft(id, data) {
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

  submit(id, data) {
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
}

module.exports =
  new SubmissionService();