import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserData } from "./Users";
import {
  useAddUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../redux/services/userApi";
import { useGetAllBooksQuery } from "../redux/services/bookApi";

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  MenuItem,
} from "@mui/material";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  borrowedBooks: [],
};

const AddUser = () => {
  const [formValues, setFormValues] = useState<UserData>(initialValues);

  const navigate = useNavigate();
  const { id } = useParams();
  const [addUser] = useAddUserMutation();
  const { data } = useGetUserByIdQuery(id!);
  const [updateUser] = useUpdateUserMutation();
  const { data: books } = useGetAllBooksQuery();

  useEffect(() => {
    if (id && data) {
      const fields = ["firstName", "lastName", "email", "borrowedBooks"];
      fields.forEach(() => setFormValues({ ...data }));
    } else {
      setFormValues({ ...initialValues });
    }
  }, [id, data]);

  // add and update notification using react toastify
  const notify = () => {
    if (!id && !toast.isActive("📖 User added successfully!")) {
      toast.success("📖 User added successfully", {
        toastId: "adduser",
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } else {
      if (!toast.isActive("User updated successfully!")) {
        toast.success("User updated successfully", {
          toastId: "updateuser",
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    }
  };

  // add new user form using formik and yup validation
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Required"),
      books: Yup.array(),
    }),

    onSubmit: async (values: UserData, { resetForm }) => {
      if (id) {
        await updateUser(values);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        await addUser(values);
        resetForm();
      }
    },
  });

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          {!id ? "Add New User" : "Update User"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                name="firstName"
                type="text"
                label="First Name"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div style={{ color: "red" }}>{formik.errors.firstName}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="lastName"
                type="text"
                label="Last Name"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div style={{ color: "red" }}>{formik.errors.lastName}</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="email"
                type="email"
                label="Email Address"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                required
                name="borrowedBooks"
                label="Select Books"
                fullWidth
                multiline
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.borrowedBooks}
                SelectProps={{ multiple: true }}
              >
                {books &&
                  books.map((book: any) => (
                    <MenuItem key={book._id} value={book._id}>
                      {book.title}
                    </MenuItem>
                  ))}
              </TextField>
              {formik.touched.borrowedBooks && formik.errors.borrowedBooks && (
                <div style={{ color: "red" }}>
                  {formik.errors.borrowedBooks}
                </div>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 5 }}
            onClick={notify}
            disabled={!formik.isValid}
          >
            {!id ? "Add" : "Update"}
          </Button>
        </form>
        {formik.isValid && <ToastContainer />}
      </Container>
    </React.Fragment>
  );
};

export default AddUser;
