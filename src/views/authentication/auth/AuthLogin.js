import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Google, LockOutlined, MailOutline } from "@mui/icons-material";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../../../redux/features/authSlice";
import { useTranslation } from 'react-i18next';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('login.errors.emailFormat'))
      .required(t('login.errors.emailRequired')),
    password: Yup.string()
      .min(6, t('login.errors.pwdMin'))
      .required(t('login.errors.pwdRequired')),
    rememberMe: Yup.bool(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      await dispatch(login({ email, password })).unwrap();
      navigate("/dashboard");
    } catch (err) {
      // Error is handled by Redux state
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {title && (
        <Typography textAlign="center" fontWeight={700} variant="h2" mb={1}>
          {t(title)}
        </Typography>
      )}

      {subtext}

      {/* {error && (
        <Box mb={2}>
          <Typography color="error" variant="body1">
            {t(error)}
          </Typography>
          <Button onClick={() => dispatch(clearError())} color="primary">
            {t('login.clearError')}
          </Button>
        </Box>
      )} */}

      <Formik
        initialValues={{ email: "", password: "", rememberMe: true }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values, isSubmitting }) => (
          <Form>
            <Stack>
              {/* Email */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="email"
                  mb="5px"
                >
                  {t('login.email')}
                </Typography>
                <Field
                  as={CustomTextField}
                  id="email"
                  name="email"
                  placeholder={t('login.emailPlaceholder')}
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
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

              {/* Password */}
              <Box mt={3}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  {t('login.password')}
                </Typography>
                <Field
                  as={CustomTextField}
                  id="password"
                  name="password"
                  placeholder={t('login.pwdPlaceholder')}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
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
                          <LockOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Remember + Forgot */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                my={2}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                      />
                    }
                    label={t('login.remember')}
                  />
                </FormGroup>
                <Typography
                  component={Link}
                  to="/auth/forgot-password"
                  fontWeight={500}
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  {t('login.forgot')}
                </Typography>
              </Stack>

              {/* Submit */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? "Logging In": t('login.loginBtn')}
              </Button>

              {/* Divider text */}
              <Typography textAlign="center" sx={{ my: 2, color: "text.secondary" }}>
                {t('login.or')}
              </Typography>

              {/* Google */}
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<Google />}
                onClick={() =>
                  (window.location.href = `${
                    import.meta.env.VITE_BASE_URL
                  }/login/google`)
                }
              >
                {t('login.google')}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      {subtitle}
    </>
  );
};

export default AuthLogin;