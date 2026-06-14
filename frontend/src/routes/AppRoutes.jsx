import { Routes, Route } from "react-router-dom";
import FormBuilder from "../pages/FormBuilder";
import StepperForm from "../pages/StepperForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormBuilder />} />
      <Route path="/stepper" element={<StepperForm />} />
    </Routes>
  );
}

export default AppRoutes;