import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [token, setToken] = useState<string | null>(null);
  const clientId =
    "358508671216-v79p6neesg3tm3u7dv74slgjr2r3t2ml.apps.googleusercontent.com";
  const handleSuccess = async (response: any) => {
    // https://oauth2.googleapis.com/tokeninfo?id_token=<tokenId> to view all user data
    const tokenId = response.credential;

    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/google-login",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    );
    console.log(res);
    const token = res.data.token;
    setToken(token);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "15px",
      }}
    >
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
