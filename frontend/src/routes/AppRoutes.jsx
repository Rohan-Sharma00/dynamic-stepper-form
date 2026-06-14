import { Routes, Route } from "react-router-dom";
import FormCreation from "../pages/FormCreation";
import CreateForm from "../pages/CreateForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormCreation />} />
      <Route path="/forms/create" element={<CreateForm />} />
      <Route
        path="/forms/edit/:id"
        element={<CreateForm />}
      />
    </Routes>
  );
}

export default AppRoutes;