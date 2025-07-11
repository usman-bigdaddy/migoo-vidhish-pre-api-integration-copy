import React, { useState } from 'react';
import {
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import { Grid2 } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WeeklyChallenge from '../../../components/modals/weeklychallenge/WeeklyChallenge';

const TopRank = ({ onCategoryChange }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <>
      <Grid2
        container
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <Typography variant="h4">{t('topRank.title')}</Typography>
          <Typography mt={2} variant="h6">{t('topRank.refreshNote')}</Typography>
        </div>

        <WeeklyChallenge />

        <Box>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <Select
              value={category}
              displayEmpty
              onChange={handleChange}
            >
              <MenuItem value="">{t('topRank.filter.allTime')}</MenuItem>
              <MenuItem value="best_per_quiz">{t('topRank.filter.bestPerQuiz') || "Best Per Quiz"}</MenuItem>
              <MenuItem value="word_choice">{t('topRank.filter.wordChoice')}</MenuItem>
              <MenuItem value="subject_verb_agreement">{t('topRank.filter.subjectVerbAgreement')}</MenuItem>
              <MenuItem value="verb_tense_consistency">{t('topRank.filter.verbTenseConsistency')}</MenuItem>
              <MenuItem value="sentence_structure">{t('topRank.filter.sentenceStructure')}</MenuItem>
              <MenuItem value="punctuation">{t('topRank.filter.punctuation')}</MenuItem>
              <MenuItem value="general">{t('topRank.filter.general')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid2>
    </>
  );
};

export default TopRank;