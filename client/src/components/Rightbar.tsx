import React from "react";

import BooksTable from "./BooksTable";

import { Box } from "@mui/material";

const Rightbar = () => {
  return (
    <Box flex={5}>
      <BooksTable />
    </Box>
  );
};

export default Rightbar;
