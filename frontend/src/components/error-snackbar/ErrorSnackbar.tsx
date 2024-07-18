import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

// used in configs/api.tsx
const ErrorSnackbar = () => {
  const [open, toggleOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }

        toggleOpen(false);
      }}
    >
      <Alert severity="error">Error. Try again</Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
