import React from "react";
import { useParams } from "react-router-dom";

import { useGetBookByIdQuery } from "../redux/services/bookApi";

const BookDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading, isSuccess } = useGetBookByIdQuery(id!);
  console.log(data);
  return <div>{data && data.name}</div>;
};

export default BookDetails;
