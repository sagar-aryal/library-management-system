import React from "react";

import Books from "./Books";

import { Box } from "@mui/material";

const Rightbar = () => {
  return (
    <Box flex={5}>
      <Books />
    </Box>
  );
};

export default Rightbar;
