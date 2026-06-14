const Form = require("../models/Form");

class FormRepository {
  create(formData) {
    return Form.create(formData);
  }

  findAll() {
    return Form.find().sort({ createdAt: -1 });
  }

  findById(id) {
    return Form.findById(id);
  }

  update(id, data) {
    return Form.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  delete(id) {
    return Form.findByIdAndDelete(id);
  }
}

module.exports = new FormRepository();