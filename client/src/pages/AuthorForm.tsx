import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthorData } from "./Authors";
import {
  useAddAuthorMutation,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
} from "../redux/services/authorApi";
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
  biography: "",
  books: [],
};

const AddAuthor = () => {
  const [formValues, setFormValues] = useState<AuthorData>(initialValues);

  const navigate = useNavigate();
  const { id } = useParams();
  const [addAuthor] = useAddAuthorMutation();
  const { data } = useGetAuthorByIdQuery(id!);
  const [updateAuthor] = useUpdateAuthorMutation();
  const { data: books } = useGetAllBooksQuery();

  useEffect(() => {
    if (id && data) {
      const fields = ["firstName", "lastName", "biography", "books"];
      fields.forEach(() => setFormValues({ ...data }));
    } else {
      setFormValues({ ...initialValues });
    }
  }, [id, data]);

  // add and update notification using react toastify
  const notify = () => {
    if (!id && !toast.isActive("📖 Author added successfully!")) {
      toast.success("📖 Author added successfully", {
        toastId: "addauthor",
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
      if (!toast.isActive("📖 Author updated successfully!")) {
        toast.success("📖 Author updated successfully", {
          toastId: "updateauthor",
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

  // add new author form using formik and yup validation
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
      biography: Yup.string()
        .max(1500, "Must be 1500 characters or less")
        .required("Required"),
      books: Yup.array().required("Required"),
    }),

    onSubmit: async (values: AuthorData, { resetForm }) => {
      if (id) {
        await updateAuthor(values);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        await addAuthor(values);
        resetForm();
      }
    },
  });

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          {!id ? "Add New Author" : "Update Author"}
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
                name="biography"
                type="text"
                label="Biography"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.biography}
              />
              {formik.touched.biography && formik.errors.biography && (
                <div style={{ color: "red" }}>{formik.errors.biography}</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                required
                name="books"
                label="Select Books"
                fullWidth
                multiline
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.books}
                SelectProps={{ multiple: true }}
              >
                {books &&
                  books.map((book: any) => (
                    <MenuItem key={book._id} value={book._id}>
                      {book.title}
                    </MenuItem>
                  ))}
              </TextField>
              {formik.touched.books && formik.errors.books && (
                <div style={{ color: "red" }}>{formik.errors.books}</div>
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

export default AddAuthor;
