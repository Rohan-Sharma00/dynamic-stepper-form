const mongoose = require("mongoose");

const validationSchema = new mongoose.Schema(
  {
    minLength: Number,
    maxLength: Number,
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    fieldType: {
      type: String,
      enum: ["text", "select", "radio"],
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    options: {
      type: [String],
      default: [],
    },

    validations: {
      type: validationSchema,
      default: {},
    },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    steps: {
      type: [stepSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", formSchema);