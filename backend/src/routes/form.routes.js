const express = require("express");

const {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} = require(
  "../controllers/form.controller"
);

const router = express.Router();

router.post("/", createForm);

router.get("/", getForms);

router.get("/:id", getFormById);

router.patch("/:id", updateForm);

router.delete("/:id", deleteForm);

module.exports = router;