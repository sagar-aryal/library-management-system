import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { login, logout } from "../redux/features/authSlice";
import { Button } from "@mui/material";

const Login = () => {
  const getToken = window.localStorage.getItem("token") || " ";
  const getUser = window.localStorage.getItem("user") || "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authUser = useAppSelector((state) => state.auth.user);
  console.log(authUser);

  const clientId =
    "358508671216-v79p6neesg3tm3u7dv74slgjr2r3t2ml.apps.googleusercontent.com";

  const handleSuccess = async (response: any) => {
    // https://oauth2.googleapis.com/tokeninfo?id_token=<tokenId> to view all user data
    const tokenId = response.credential;
    console.log(tokenId);

    await axios.post(
      "http://localhost:5000/api/v1/auth/google-login",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
        withCredentials: true,
      }
    );

    dispatch(login(tokenId));
    navigate("/", { replace: true });
  };

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "15px",
      }}
    >
      {getToken && getUser ? (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <p>User: {getUser}</p>
        </>
      ) : (
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSuccess} />
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default Login;
