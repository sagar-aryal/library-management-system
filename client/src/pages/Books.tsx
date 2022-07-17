import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from "../redux/services/bookApi";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Table,
  TablePagination,
  IconButton,
  Button,
  Grid,
  Typography,
  Paper,
  Container,
  Menu,
  MenuItem,
  Fade,
  ButtonGroup,
} from "@mui/material";
import { Clear, Check, MoreVert } from "@mui/icons-material";
import { toast, ToastContainer, Slide } from "react-toastify";

interface Header {
  id: "isbn" | "name" | "authors" | "publisher" | "publishedDate" | "available";
  label: string;
}

export interface BookData {
  id?: number;
  isbn?: string;
  name: string;
  authors: any;
  publisher: string;
  publishedDate: string;
  available?: "BORROWED" | "AVAILABLE";
}

type Order = "asc" | "desc";

// Table header label
const header: Header[] = [
  { id: "name", label: "Name" },
  { id: "authors", label: "Authors" },
  { id: "publisher", label: "Publisher" },
  { id: "publishedDate", label: "Published Date" },
  { id: "available", label: "Available" },
];

const Books = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof BookData>("name");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useGetAllBooksQuery();
  // console.log(data);
  const [deleteBook] = useDeleteBookMutation();

  // Action buttion functionality for admins only
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Sorting functionality
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Pagination functionality
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete book handler
  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteBook(id);
      toast.success("Book deleted successfully !", {
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

  return (
    <>
      {error ? (
        <Typography variant="h5">Ops! Data not found</Typography>
      ) : isLoading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : isSuccess ? (
        <Container sx={{ maxHeight: 450, width: "100%" }}>
          <Grid container alignItems="center" spacing={2} mb={2}>
            <Grid item>
              <Typography variant="h5">Books</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to="/addbook"
              >
                Add New
              </Button>
            </Grid>
          </Grid>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 440, overflow: "scroll" }}
          >
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  {header.map((head) => (
                    <TableCell key={head.id}>
                      <TableSortLabel
                        active={orderBy === head.id}
                        direction={orderBy === head.id ? order : "asc"}
                        onClick={(event) => handleRequestSort(event, head.id)}
                      >
                        {head.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.name}</TableCell>
                      <TableCell>
                        {Array.isArray(book.authors) &&
                          book.authors.map((author: string) => (
                            <li key={author} style={{ listStyle: "none" }}>
                              {author}
                            </li>
                          ))}
                      </TableCell>
                      <TableCell>{book.publisher}</TableCell>
                      <TableCell>{book.publishedDate}</TableCell>

                      <TableCell>
                        {book.available === "AVAILABLE" ? (
                          <Check style={{ color: "green" }} />
                        ) : (
                          <Clear style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <ButtonGroup
                          variant="text"
                          aria-label="text button group"
                          color="inherit"
                        >
                          <Button
                            size="small"
                            onClick={() => {
                              navigate(`/books/${book.id}`, {
                                replace: true,
                              });
                            }}
                          >
                            View
                          </Button>

                          <Button
                            size="small"
                            disabled={
                              book.available === "BORROWED" ? true : false
                            }
                          >
                            Borrow
                          </Button>

                          {/*  <Button
                            size="small"
                            onClick={() => {
                              navigate(`/updatebook/${book.id}`, {
                                replace: true,
                              });
                            }}
                          >
                            Update
                          </Button> */}

                          <IconButton
                            aria-label="moveverticon"
                            color="inherit"
                            id="fade-button"
                            aria-controls={open ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <MoreVert />
                          </IconButton>
                          <Menu
                            id="fade-menu"
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                          >
                            <MenuItem
                              onClick={() => {
                                navigate(`/updatebook/${book.id}`, {
                                  replace: true,
                                });
                              }}
                            >
                              Update
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDelete(book.id);
                                handleClose();
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ToastContainer />
        </Container>
      ) : null}
    </>
  );
};

export default Books;
