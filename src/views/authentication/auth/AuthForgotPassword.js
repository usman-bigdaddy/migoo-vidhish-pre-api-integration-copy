import React from "react";
import { Box, Typography, Button, Stack, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router"; // 👈 correct import
import { MailOutline } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import "./style.css";
import { forgotPassword } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import {useTranslation} from "react-i18next"

const AuthForgotPassword = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate(); // 👈 Initialize navigate
  const dispatch = useDispatch()
  const { t } = useTranslation();


  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t('forgot.invalidEmail')).required(t('forgot.requiredEmail')),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(
        forgotPassword({ email: values.email })
      ).unwrap();
      navigate("/auth/reset-password");
    } catch (err) {
      // Error is handled via Redux state
      setSubmitting(false);
    }
  };

  return (
    <>
      {title && (
        <Typography textAlign={"center"} fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                  {t('forgot.email')}
                </Typography>
                <Field
                  as={CustomTextField}
                  name="email"
                  id="email"
                  placeholder= {t("forgot.enterEmail")}
                  fullWidth
                  variant="outlined"
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={touched.email && errors.email}
                              sx={{
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
      opacity: 1,
    },
  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box mt={2}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit" // 👈 Correct submit
                >
                  {t("forgot.submit")}
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>

      {subtitle}
    </>
  );
};

export default AuthForgotPassword;
