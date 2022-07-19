import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookData } from "./Books";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/services/bookApi";
import { useGetAllAuthorsQuery } from "../redux/services/authorApi";

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
  isbn: "",
  title: "",
  description: "",
  category: "",
  authors: [],
  publisher: "",
  publishedDate: "",
};

const AddBook = () => {
  const [formValues, setFormValues] = useState<BookData>(initialValues);

  const navigate = useNavigate();
  const { id } = useParams();
  const [addBook] = useAddBookMutation();
  const { data } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const { data: authors } = useGetAllAuthorsQuery();

  useEffect(() => {
    if (id && data) {
      const fields = ["isbn", "name", "authors", "publisher", "publishedDate"];
      fields.forEach(() => setFormValues({ ...data }));
    } else {
      setFormValues({ ...initialValues });
    }
  }, [id, data]);

  // add and update notification using react toastify
  const notify = () => {
    if (!id && !toast.isActive("📖 Book added successfully!")) {
      toast.success("📖 Book added successfully", {
        toastId: "addbook",
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
      if (!toast.isActive("📖 Book updated successfully!")) {
        toast.success("📖 Book updated successfully", {
          toastId: "updatebook",
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

  // add new book form using formik and yup validation
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      isbn: Yup.string()
        .required("Required")
        .matches(
          /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
          "ISBN must match both the old 10 digit ISBNs and the new 13 digit ISBNs"
        ),
      title: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(1500, "Must be 1500 characters or less")
        .required("Required"),
      category: Yup.string().required("Required"),
      authors: Yup.array().required("Required"),
      publisher: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      publishedDate: Yup.string()
        .required("Required")
        .matches(/^\d{4}$/, "Must be a published year"),
    }),

    onSubmit: async (values: BookData, { resetForm }) => {
      console.log(values);
      if (id) {
        await updateBook(values);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        await addBook(values);
        resetForm();
      }
    },
  });

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          {!id ? "Add New Book" : "Update a Book"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                name="isbn"
                type="text"
                label="ISBN"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isbn}
              />
              {formik.touched.isbn && formik.errors.isbn && (
                <div style={{ color: "red" }}>{formik.errors.isbn}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="title"
                type="text"
                label="Name"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="description"
                type="text"
                label="Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                name="category"
                label="Select Category"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <MenuItem value="DRAMA">Drama</MenuItem>
                <MenuItem value="FICTION">Fiction</MenuItem>
                <MenuItem value="FOLKTALE">Folktale</MenuItem>
                <MenuItem value="NONFICTION">Nonfiction</MenuItem>
                <MenuItem value="POETRY">Poetry</MenuItem>
              </TextField>
              {formik.touched.category && formik.errors.category && (
                <div style={{ color: "red" }}>{formik.errors.category}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                name="authors"
                label="Select Authors"
                fullWidth
                multiline
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.authors}
                SelectProps={{ multiple: true }}
              >
                {authors &&
                  authors.map((author: any) => (
                    <MenuItem key={author._id} value={author._id}>
                      {author.firstName} {author.lastName}
                    </MenuItem>
                  ))}
              </TextField>
              {formik.touched.authors && formik.errors.authors && (
                <div style={{ color: "red" }}>{formik.errors.authors}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="publisher"
                type="string"
                label="Publisher"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.publisher}
              />
              {formik.touched.publisher && formik.errors.publisher && (
                <div style={{ color: "red" }}>{formik.errors.publisher}</div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="publishedDate"
                type="string"
                label="Published Date"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.publishedDate}
              />
              {formik.touched.publishedDate && formik.errors.publishedDate && (
                <div style={{ color: "red" }}>
                  {formik.errors.publishedDate}
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

export default AddBook;
