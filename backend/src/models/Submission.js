const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
      index: true,
    },

    currentStep: {
      type: Number,
      default: 0,
    },

    completedSteps: {
      type: Number,
      default: 0,
    },

    answers: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index({
  status: 1,
  createdAt: -1,
});

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);