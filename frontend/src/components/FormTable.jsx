import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

function FormTable({
  forms,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>

            <TableCell>
              Description
            </TableCell>

            <TableCell>
              Steps
            </TableCell>

            <TableCell>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {forms.map((form) => (
            <TableRow key={form._id}>
              <TableCell>
                {form.title}
              </TableCell>

              <TableCell>
                {form.description}
              </TableCell>

              <TableCell>
                {form.steps.length}
              </TableCell>

              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() =>
                    navigate(
                      `/forms/edit/${form._id}`
                    )
                  }
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    onDelete(form._id)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default FormTable;