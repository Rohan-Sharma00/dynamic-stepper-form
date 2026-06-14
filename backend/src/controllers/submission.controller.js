const submissionService = require(
  "../services/submission.service"
);

const createSubmission = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.create(
        req.body
      );

    res.status(201).json(
      submission
    );
  } catch (error) {
    next(error);
  }
};

const getSubmissions = async (
  req,
  res,
  next
) => {
  try {
    const submissions =
      await submissionService.getAll();

    res.json(submissions);
  } catch (error) {
    next(error);
  }
};

const getSubmissionById =
  async (req, res, next) => {
    try {
      const submission =
        await submissionService.getById(
          req.params.id
        );

      res.json(submission);
    } catch (error) {
      next(error);
    }
  };

const saveDraft = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.saveDraft(
        req.params.id,
        req.body
      );

    res.json(submission);
  } catch (error) {
    next(error);
  }
};

const submitForm = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.submit(
        req.params.id,
        req.body
      );

    res.json(submission);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  saveDraft,
  submitForm,
};