import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  Box,
  Menu,
  MenuItem,
  Fade,
  ButtonGroup,
} from "@mui/material";
import { Clear, Check, MoreVert } from "@mui/icons-material";

interface Header {
  id: "name" | "authors" | "publisher" | "publishedDate" | "available";
  label: string;
}

interface Data {
  name: string;
  authors: string;
}

type Order = "asc" | "desc";

const header: readonly Header[] = [
  { id: "name", label: "Name" },
  { id: "authors", label: "Authors" },
  { id: "publisher", label: "Publisher" },
  { id: "publishedDate", label: "Published Date" },
  { id: "available", label: "Available" },
];

const data = [
  {
    name: "Web Development 2022",
    authors: "Sagar Aryal",
    publishedDate: "2018",
    publisher: "Illonen",
    available: "AVAILABLE",
  },
  {
    name: "Full Stack web Development ",
    authors: "Developer Aryal",
    publishedDate: "2010",
    publisher: "Tampa",
    available: "BORROWED",
  },
];

const Books = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  return (
    <Container>
      <Box sx={{ maxHeight: 450, width: "100%", mb: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item sx={{ my: 3 }}>
            <Typography variant="h5">Books</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              component={Link}
              to="/bookform"
            >
              Add New
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ overflow: "scroll" }}>
          <Table aria-label="simple table">
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
                .map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.authors}</TableCell>
                    <TableCell>{book.publishedDate}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell> {book.available}</TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        color="inherit"
                      >
                        <Button size="small">View</Button>
                        <Button size="small">Borrow</Button>
                      </ButtonGroup>
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
                        <MenuItem onClick={handleClose}>Update</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Books;
