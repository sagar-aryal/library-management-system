import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";

interface FormValues {
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// styling for authors select options
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UpdateBook = () => {
  // submit notification using react toastify
  const notify = () => {
    if (!toast.isActive("📖 Book added successfully!")) {
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
    }
  };

  // add new book form using formik and yup validation
  const formik = useFormik({
    initialValues: {
      isbn: "",
      title: "",
      authors: [],
      publishedDate: "",
      publisher: "",
    },

    validationSchema: Yup.object({
      isbn: Yup.string()
        .required("Required")
        .matches(
          /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
          "ISBN must match both the old 10 digit ISBNs and the new 13 digit ISBNs"
        ),
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      authors: Yup.array().required("Required"),
      publisher: Yup.string()
        .max(20, "Must be 15 characters or less")
        .required("Required"),
      publishedDate: Yup.string()
        .required("Required")
        .matches(/^\d{4}$/, "Must be a published year"),
    }),

    onSubmit: (values: FormValues, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          Update a Book
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
                label="Title"
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
              <FormControl fullWidth>
                <InputLabel>Authors *</InputLabel>
                <Select
                  name="authors"
                  type="text"
                  required
                  multiple
                  label="Authors *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.authors}
                  MenuProps={MenuProps}
                >
                  <MenuItem disabled value="">
                    Authors
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.authors && formik.errors.authors && (
                  <div style={{ color: "red" }}>{formik.errors.authors}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="publisher"
                type="text"
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
                type="text"
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
            Update
          </Button>
        </form>
        {formik.isValid && <ToastContainer />}
      </Container>
    </React.Fragment>
  );
};

export default UpdateBook;
