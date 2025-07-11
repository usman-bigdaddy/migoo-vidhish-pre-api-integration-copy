import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { googleLogin, getProfile } from "../../../redux/features/authSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(googleLogin()).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getProfile()).then((profileResult) => {
          if (profileResult.meta.requestStatus === "fulfilled") {
            navigate("/dashboard");
          }
        });
      }
    });
  }, [dispatch, navigate]);


  return (
    <Box>
      <Typography variant="body1">Signing you in...</Typography>
    </Box>
  );
};

export default GoogleCallback;
