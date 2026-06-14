const express = require("express");

const {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  saveDraft,
  submitForm,
  deleteSubmission
} = require(
  "../controllers/submission.controller"
);

const router = express.Router();

router.post(
  "/",
  createSubmission
);

router.get(
  "/",
  getSubmissions
);

router.get(
  "/:id",
  getSubmissionById
);

router.patch(
  "/:id/save",
  saveDraft
);

router.post(
  "/:id/submit",
  submitForm
);

router.delete(
  "/:id",
  deleteSubmission
);

module.exports = router;