import React, { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import UpgradeFlow from './UpgradeFlow';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const UpgradeButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { t } = useTranslation();

  return (
    <>
      <Button startIcon={<Add />} variant="contained" color="primary" onClick={handleOpen}>
      {t('titles.upgrade')}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <UpgradeFlow onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default UpgradeButton;
