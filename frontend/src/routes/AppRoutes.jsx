import { Routes, Route } from "react-router-dom";
import FormCreation from "../pages/FormCreation";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormCreation />} />
    </Routes>
  );
}

export default AppRoutes;