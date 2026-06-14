import api from "./api";

export const getSubmissions = async () => {
  const response = await api.get("/submissions");
  return response.data;
};

export const getSubmissionById = async (id) => {
  const response = await api.get(`/submissions/${id}`);
  return response.data;
};

export const createSubmission = async (data) => {
  const response = await api.post("/submissions", data);

  return response.data;
};

export const saveDraft = async (id, data) => {
  const response = await api.patch(`/submissions/${id}/save`, data);

  return response.data;
};

export const submitSubmission = async (id, data) => {
  const response = await api.post(`/submissions/${id}/submit`, data);

  return response.data;
};

export const deleteSubmission =
  async (id) => {
    const response =
      await api.delete(
        `/submissions/${id}`
      );

    return response.data;
  };