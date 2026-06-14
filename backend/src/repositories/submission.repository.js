const Submission = require("../models/Submission");

class SubmissionRepository {
  create(data) {
    return Submission.create(data);
  }

  findAll() {
    return Submission.find()
      .populate("formId", "title")
      .sort({ createdAt: -1 });
  }

  findById(id) {
    return Submission.findById(id).populate(
      "formId"
    );
  }

  update(id, data) {
    return Submission.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }
}

module.exports =
  new SubmissionRepository();