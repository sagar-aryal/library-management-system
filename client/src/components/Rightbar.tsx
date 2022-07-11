import React from "react";
import { Routes, Route } from "react-router-dom";

import Books from "../pages/Books";

import { Box } from "@mui/material";
import Users from "../pages/Users";
import Authors from "../pages/Authors";
import BookForm from "../pages/BookForm";

const Rightbar = () => {
  return (
    <Box flex={5}>
      <Routes>
        <Route index element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/bookform" element={<BookForm />} />
      </Routes>
    </Box>
  );
};

export default Rightbar;
