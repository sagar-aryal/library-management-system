import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sessionJwt: string | null = sessionStorage.getItem("jwt");
