import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FormCreation from "../pages/FormCreation";
import CreateForm from "../pages/CreateForm";
import Submissions from "../pages/Submissions";
import FillSubmission from "../pages/FillSubmission";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/submissions"
            replace
          />
        }
      />

      <Route
        path="/forms"
        element={<FormCreation />}
      />

      <Route
        path="/forms/create"
        element={<CreateForm />}
      />

      <Route
        path="/forms/edit/:id"
        element={<CreateForm />}
      />

      <Route
        path="/submissions"
        element={<Submissions />}
      />

      <Route
        path="/submissions/:id"
        element={<FillSubmission />}
      />
    </Routes>
  );
}

export default AppRoutes;