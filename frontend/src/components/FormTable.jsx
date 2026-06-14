import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function FormTable({ forms }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Steps</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {forms.map((form) => (
          <TableRow key={form._id}>
            <TableCell>{form.title}</TableCell>

            <TableCell>
              {form.steps.length}
            </TableCell>

            <TableCell>
              {form.createdAt}
            </TableCell>

            <TableCell>
              <IconButton>
                <EditIcon />
              </IconButton>

              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FormTable;