import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlined from '@mui/icons-material/LockOutlined';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { changePassword } from '../../../redux/features/authSlice';
import { useTranslation } from 'react-i18next';

// Validation schema with translated messages
const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('resetPassword.validation.currentPasswordRequired')
    .min(8, 'resetPassword.validation.passwordMin'),
  password: Yup.string()
    .required('resetPassword.validation.passwordRequired')
    .min(8, 'resetPassword.validation.passwordMin')
    .notOneOf([Yup.ref('currentPassword')], 'resetPassword.validation.passwordDifferent'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'resetPassword.validation.passwordsMatch')
    .required('resetPassword.validation.confirmPasswordRequired'),
});

const AuthResetPassword = ({ title, subtitle, subtext }) => {
  const { t } = useTranslation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <>
      {title && (
        <Typography textAlign="center" fontWeight={700} variant="h2" mb={1}>
          {t('resetPassword.title')}
        </Typography>
      )}

      {subtext}

      <Formik
        initialValues={{ currentPassword: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await dispatch(
              changePassword({
                current_password: values.currentPassword,
                new_password: values.password,
              })
            ).unwrap();
            resetForm();
            navigate('/dashboard');
          } catch (err) {
            // Error is handled by Redux state
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Stack spacing={3}>
              {/* Current Password */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="currentPassword"
                  mb="5px"
                >
                  Current Password
                </Typography>
                <CustomTextField
                  id="currentPassword"
                  name="currentPassword"
                  placeholder={t('resetPassword.currentPasswordPlaceholder')}
                  type={showCurrentPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.currentPassword && Boolean(errors.currentPassword)}
                  helperText={touched.currentPassword && t(errors.currentPassword)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleToggleCurrentPassword} edge="end">
                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                />
              </Box>

              {/* New Password */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  {t('resetPassword.newPassword')}
                </Typography>
                <CustomTextField
                  id="password"
                  name="password"
                  placeholder={t('resetPassword.newPasswordPlaceholder')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  fullWidth
                />
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="confirmPassword"
                  mb="5px"
                >
                  {t('resetPassword.confirmPassword')}
                </Typography>
                <CustomTextField
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                          <IconButton onClick={handleToggleConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                />
              </Box>
            </Stack>

            {/* Submit */}
            <Box mt="25px">
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? t('resetPassword.changing') : t('resetPassword.save')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* {subtitle} */}
    </>
  );
};

export default AuthResetPassword;