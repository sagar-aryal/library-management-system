import React from "react";
import { Routes, Route } from "react-router-dom";

import Books from "../pages/Books";
import BookForm from "../pages/BookForm";
import BookDetails from "../pages/BookDetails";
import Users from "../pages/Users";
import UserForm from "../pages/UserForm";
import Authors from "../pages/Authors";
import AuthorForm from "../pages/AuthorForm";
import AuthorDetails from "../pages/AuthorDetails";
import Login from "../pages/Login";

import { Box } from "@mui/material";

const Rightbar = () => {
  return (
    <Box flex={5}>
      <Routes>
        <Route index element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/addbook" element={<BookForm />} />
        <Route path="/updatebook/:id" element={<BookForm />} />

        <Route path="/users" element={<Users />} />
        <Route path="/adduser" element={<UserForm />} />
        <Route path="/updateuser/:id" element={<UserForm />} />

        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/addauthor" element={<AuthorForm />} />
        <Route path="/updateauthor/:id" element={<AuthorForm />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
};

export default Rightbar;
