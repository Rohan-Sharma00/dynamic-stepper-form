import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-semibold mb-8">
        Stepper Form
      </h2>

      <div className="flex flex-col gap-2">
        <NavLink
          to="/"
          className="p-3 rounded hover:bg-gray-100"
        >
          Form Creation
        </NavLink>

        <NavLink
          to="/submissions"
          className="p-3 rounded hover:bg-gray-100"
        >
          Submissions
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;