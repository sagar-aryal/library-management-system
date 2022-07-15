import React from "react";
import { Routes, Route } from "react-router-dom";

import Books from "../pages/Books";

import { Box } from "@mui/material";
import Users from "../pages/Users";
import Authors from "../pages/Authors";
import BookForm from "../pages/BookForm";
import BookDetails from "../pages/BookDetails";

const Rightbar = () => {
  return (
    <Box flex={5}>
      <Routes>
        <Route index element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/addbook" element={<BookForm />} />
        <Route path="/updatebook/:id" element={<BookForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
    </Box>
  );
};

export default Rightbar;
