// src/views/settings/components/LanguagePreferences.js
import React from 'react';
import { Stack, Box, Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../../context/ThemeContext';

// ─────────────────────────────────────────────
// Language options you support in the project
// ─────────────────────────────────────────────
const languageOptions = [
  { label: 'English', code: 'en' },
  { label: 'עברית',   code: 'he' }
];

const LanguagePreferences = () => {
  const { t, i18n } = useTranslation();
  const { toggleDirection } = useThemeContext();   // switches MUI theme LTR/RTL

  // Find current lang object so it appears pre‑selected
  const currentLang =
    languageOptions.find(l => l.code === i18n.language) || languageOptions[0];

  // Handle change from the autocomplete
  const handleChange = (_, value) => {
    if (!value) return;
    // 1️⃣ change language for i18next
    i18n.changeLanguage(value.code);
    // 2️⃣ set document direction for plain HTML / CSS
    document.body.dir = value.code === 'he' ? 'rtl' : 'ltr';
    // 3️⃣ inform your custom theme context so MUI re‑renders RTL ⬅️➡️
    toggleDirection(value.code === 'he');
  };

  return (
    <Stack maxWidth={500} width="100%">
      <Box mt={2}>
        <Autocomplete
          fullWidth
          size="small"
          options={languageOptions}
          value={currentLang}
          getOptionLabel={(option) => option.label}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('settings.languagePreferences.label')} // "Language" | "שפה"
            />
          )}
        />
      </Box>
    </Stack>
  );
};

export default LanguagePreferences;
