import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Autocomplete
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Google, LockOutlined, MailOutline, Person2Outlined } from '@mui/icons-material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { register } from '../../../redux/features/authSlice';
import './style.css';

const countries = [
  { label: 'India' }, { label: 'USA' }, { label: 'Hungary' }, { label: 'Europe' },
  { label: 'Australia' }, { label: 'Sri Lanka' }, { label: 'Andaman' },
  { label: 'Nicobar' }, { label: 'England' }, { label: 'Antarctica' }, { label: 'Africa' },
  { label: 'Bangladesh' }
];

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('register.validation.firstNameRequired'),
  last_name: Yup.string().required('register.validation.lastNameRequired'),
  email: Yup.string().email('register.validation.invalidEmail').required('register.validation.emailRequired'),
  password: Yup.string()
    .min(6, 'register.validation.passwordMin')
    .required('register.validation.passwordRequired'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'register.validation.passwordsMatch')
    .required('register.validation.confirmPasswordRequired'),
  terms: Yup.boolean().oneOf([true], 'register.validation.terms'),
});

const AuthRegister = ({ title, subtitle, subtext }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { first_name, last_name, email, password } = values;
      await dispatch(
        register({ first_name, last_name, email, password })
      ).unwrap();
      navigate("/auth/confirm-email", { state: { email } });
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
          {t('register.title')}
        </Typography>
      )}
      {subtext}

      {error && (
        <Box mb={2}>
          <Typography color="error" variant="body1">
            {t('register.error', { error })}
          </Typography>
          <Button onClick={() => dispatch(clearError())} color="primary">
            {t('register.clearError')}
          </Button>
        </Box>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, isSubmitting, setFieldValue }) => (
          <Form>
            <Stack mb={3}>
              {/* First Name */}
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="first_name" mb="5px">
                  {t('register.name')}
                </Typography>
                <CustomTextField
                  name="first_name"
                  placeholder={t('register.namePlaceholder')}
                  variant="outlined"
                  fullWidth
                  value={values.first_name}
                  onChange={handleChange}
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && t(errors.first_name)}
                  // error={touched.name && Boolean(errors.name)}
                  // helperText={touched.name && t(errors.name)}
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
                          <Person2Outlined />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Last Name */}
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="last_name" mb="5px">
                  Last Name
                </Typography>
                <CustomTextField
                  name="last_name"
                  placeholder={t('register.lastNamePlaceHolder')}
                  variant="outlined"
                  fullWidth
                  value={values.last_name}
                  onChange={handleChange}
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && t(errors.last_name)}
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
                          <Person2Outlined />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Email */}
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                  {t('register.email')}
                </Typography>
                <CustomTextField
                  name="email"
                  placeholder={t('register.emailPlaceholder')}
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && t(errors.email)}
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

              {/* Country */}
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="country" mb={0.5}>
                  {t('register.country')}
                </Typography>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option?.label || ''}
                  value={values.country}
                  onChange={(event, value) => setFieldValue('country', value)}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder={t('register.countryPlaceholder')}
                    sx={{
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
      opacity: 1,
    },
  }}
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && t(errors.country)}
                    />
                  )}
                />
              </Box>

              {/* Password */}
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                  {t('register.password')}
                </Typography>
                <CustomTextField
                  name="password"
                  placeholder={t('register.passwordPlaceholder')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && t(errors.password)}
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

              {/* Confirm Password */}
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword" mb="5px">
                  {t('register.confirmPassword')}
                </Typography>
                <CustomTextField
                  name="confirmPassword"
                  placeholder={t('register.confirmPasswordPlaceholder')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && t(errors.confirmPassword)}
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

              {/* Terms */}
              <Stack direction="row" alignItems="center" my={2}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox name="terms" checked={values.terms} onChange={handleChange} />
                    }
                    label={
                      <>
                        {t('register.termsPrefix')}{' '}
                        <Link to="/terms-of-service" style={{ color: '#007bff', textDecoration: 'none' }}>
                          {t('register.termsOfService')}
                        </Link>{' '}
                        {t('register.and')}{' '}
                        <Link to="/privacy-policy" style={{ color: '#007bff', textDecoration: 'none' }}>
                          {t('register.privacyPolicy')}
                        </Link>.
                      </>
                    }
                  />
                  {touched.terms && errors.terms && (
                    <Typography color="error" variant="caption">
                      {t(errors.terms)}
                    </Typography>
                  )}
                </FormGroup>
              </Stack>
            </Stack>

            {/* Create Account Button */}
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? t('register.creatingAccount') : t('register.createAccount')}
            </Button>
          </Form>
        )}
      </Formik>

      <p className="text-with-lines">{t('register.orContinue')}</p>

      {/* Google */}
      <Box>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<Google />}
          component={Link}
          onClick={() => (window.location.href = `${import.meta.env.VITE_BASE_URL}/login/google`)}
        >
          {t('register.google')}
        </Button>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthRegister;