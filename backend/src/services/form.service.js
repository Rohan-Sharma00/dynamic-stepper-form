const formRepository = require(
  "../repositories/form.repository"
);

class FormService {
  create(formData) {
    return formRepository.create(formData);
  }

  getAll() {
    return formRepository.findAll();
  }

  getById(id) {
    return formRepository.findById(id);
  }

  update(id, data) {
    return formRepository.update(id, data);
  }

  delete(id) {
    return formRepository.delete(id);
  }
}

module.exports = new FormService();