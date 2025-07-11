import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { unsubscribe } from '../../../redux/features/settingSlice';
import { useTranslation } from 'react-i18next';

export default function CancelPlanModal() {
  const { t } = useTranslation();        // i18n hook
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [feedbackReason, setFeedbackReason] = React.useState('');
  const [otherText, setOtherText] = React.useState('');
  const [confirmChecked, setConfirmChecked] = React.useState(false);
  const dispatch = useDispatch();
  const { nextBillDate, loading, error } = useSelector((state) => state.setting);

  const handleOpen = () => {
    setOpen(true);
    setStep(1);
    setFeedbackReason('');
    setOtherText('');
    setConfirmChecked(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleConfirm = () => {
    dispatch(unsubscribe()).then((result) => {
      if (result.payload) {
        setStep(4);
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      /* ---------- STEP 1 ---------- */
      case 1:
        return (
          <Box textAlign="center">
            <DialogTitle>{t('cancelPlan.step1.title')}</DialogTitle>
            <DialogContent>
              <Typography>{t('cancelPlan.step1.line1')}</Typography>
              <Typography mt={1}>{t('cancelPlan.step1.line2')}</Typography>

              <Stack mt={3} spacing={2}>
                <Button variant="contained" onClick={handleClose}>
                  {t('cancelPlan.step1.keep')}
                </Button>
                <Button variant="outlined" onClick={handleNext}>
                  {t('cancelPlan.step1.cancel')}
                </Button>
              </Stack>
            </DialogContent>
          </Box>
        );

      /* ---------- STEP 2 ---------- */
      case 2:
        return (
          <Box>
            <DialogTitle>{t('cancelPlan.step2.title')}</DialogTitle>
            <DialogContent>
              <Typography mb={2}>{t('cancelPlan.step2.subtitle')}</Typography>

              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={feedbackReason}
                  onChange={(e) => setFeedbackReason(e.target.value)}
                >
                  <FormControlLabel value="not_using"  control={<Radio />} label={t('cancelPlan.step2.reasons.not_using')} />
                  <FormControlLabel value="issues"     control={<Radio />} label={t('cancelPlan.step2.reasons.issues')} />
                  <FormControlLabel value="alternative"control={<Radio />} label={t('cancelPlan.step2.reasons.alternative')} />
                  <FormControlLabel value="temporary"  control={<Radio />} label={t('cancelPlan.step2.reasons.temporary')} />
                  <FormControlLabel value="expensive"  control={<Radio />} label={t('cancelPlan.step2.reasons.expensive')} />
                  <FormControlLabel value="other"      control={<Radio />} label={t('cancelPlan.step2.reasons.other')} />
                </RadioGroup>

                {feedbackReason === 'other' && (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={t('cancelPlan.step2.otherLabel')}
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                  />
                )}
              </FormControl>

              <Stack direction="row" justifyContent="space-between" mt={3}>
                <Button onClick={handleBack}>{t('back')}</Button>
                <Button variant="contained" onClick={handleNext} disabled={!feedbackReason}>
                  {t('continue')}
                </Button>
              </Stack>
            </DialogContent>
          </Box>
        );

      /* ---------- STEP 3 ---------- */
      case 3:
        return (
          <Box>
            <DialogTitle>{t('cancelPlan.step3.title')}</DialogTitle>
            <DialogContent>
              {error && (
                <Typography color="error" mb={2}>
                  Error: {error}
                </Typography>
              )}
              <Typography mb={2}>
                {t('cancelPlan.step3.line1', { date: '31/05/2025' })}
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={confirmChecked}
                    onChange={(e) => setConfirmChecked(e.target.checked)}
                  />
                }
                label={t('cancelPlan.step3.checkbox')}
              />

              <Stack direction="row" justifyContent="space-between" mt={3}>
                <Button onClick={handleBack}>{t('back')}</Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleConfirm}
                  disabled={!confirmChecked || loading}
                >
                  {t('cancelPlan.step3.confirm')}
                </Button>
              </Stack>
            </DialogContent>
          </Box>
        );

      /* ---------- STEP 4 ---------- */
      case 4:
        return (
          <Box textAlign="center">
            <DialogTitle>{t('cancelPlan.step4.title')}</DialogTitle>
            <DialogContent>
              <Typography>
                {t('cancelPlan.step4.line1', { date: '31/05/2025' })}
              </Typography>
              <Button sx={{ mt: 3 }} variant="contained" onClick={handleClose}>
                {t('goBack')}
              </Button>
            </DialogContent>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{ color: '#c7c8c9', border: 'none' }}
      >
        {t('cancelPlan.openButton')}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {renderStep()}
      </Dialog>
    </>
  );
}