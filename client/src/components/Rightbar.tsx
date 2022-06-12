import React from "react";

import { Box } from "@mui/material";
import Books from "./Books";

const Rightbar = () => {
  return (
    <Box flex={4} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Books />
    </Box>
  );
};

export default Rightbar;
