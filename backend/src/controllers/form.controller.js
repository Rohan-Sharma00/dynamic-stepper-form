const formService = require(
  "../services/form.service"
);

const createForm = async (
  req,
  res,
  next
) => {
  try {
    const form =
      await formService.create(req.body);

    res.status(201).json(form);
  } catch (error) {
    next(error);
  }
};

const getForms = async (
  req,
  res,
  next
) => {
  try {
    const forms =
      await formService.getAll();

    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

const getFormById = async (
  req,
  res,
  next
) => {
  try {
    const form =
      await formService.getById(
        req.params.id
      );

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
};

const updateForm = async (
  req,
  res,
  next
) => {
  try {
    const form =
      await formService.update(
        req.params.id,
        req.body
      );

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
};

const deleteForm = async (
  req,
  res,
  next
) => {
  try {
    await formService.delete(
      req.params.id
    );

    res.status(200).json({
      message: "Form deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
};