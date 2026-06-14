const express = require("express");

const {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  saveDraft,
  submitForm,
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

module.exports = router;