import { useState } from "react";
import { Button, TextField } from "@mui/material";

function FormBuilder() {
  const [title, setTitle] = useState("");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Form
      </h1>

      <TextField
        fullWidth
        label="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button
        sx={{ mt: 2 }}
        variant="contained"
      >
        Add Step
      </Button>
    </div>
  );
}

export default FormBuilder;