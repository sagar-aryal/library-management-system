import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetAuthorByIdQuery } from "../redux/services/authorApi";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";

const AuthorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetAuthorByIdQuery(id!);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" component="h4">
          {data && data.firstName}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          {data && data.lastName}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          {data && data.biography}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Books
        </Typography>
        <Typography color="text.secondary">
          {data &&
            data.books.map((book: string, index: number) => (
              <li key={index}>{book}</li>
            ))}
          <br />
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Container sx={{ marginBottom: "5rem" }}>
      <Grid container direction="column">
        <Grid item mb={2}>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate("/authors")}
            >
              Go Back
            </Button>
          </CardActions>
        </Grid>
        <Grid item>
          <Box>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorDetails;
