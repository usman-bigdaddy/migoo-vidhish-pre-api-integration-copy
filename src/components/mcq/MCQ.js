import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Tooltip,
  IconButton
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const MCQ = ({
  question,
  options,
  index,
  selectedOption,
  handleOptionChange,
  showResult,
  onSubmit
}) => {
  const handleSelection = (event) => {
    const selectedValue = event.target.value;
    handleOptionChange(index, selectedValue);
    if (onSubmit) onSubmit();
  };

const getOptionStyle = (option) => {
  if (!showResult) return {};
  if (option.isCorrect) {
    return { backgroundColor: '#2e7d32', color: 'white' }; // dark green
  } else if (selectedOption === option.text) {
    return { backgroundColor: '#c62828', color: 'white' }; // dark red
  } else {
    return {};
  }
};


  return (
    <Box mb={4}>
      <Typography variant="h6" mb={1}>
        {index + 1}. {question}
      </Typography>
      <RadioGroup value={selectedOption || ''} onChange={handleSelection}>
        {options.map((option, i) => {
          const isCorrect = option.isCorrect;
          const isSelected = selectedOption === option.text;

          return (
         <Paper
  key={i}
  elevation={0}
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8px',
    px: 1,
    mb: 1,
    ...getOptionStyle(option)
  }}
>
  <FormControlLabel
    value={option.text}
    control={<Radio />}
    label={option.text}
    sx={{ flex: 1 }}
  />

  {option.explanation && showResult && option.isCorrect && (
    <Tooltip
    title={option.explanation}
    arrow
    placement="top"
    componentsProps={{
      tooltip: {
        sx: {
          bgcolor: '#333', // dark grey background
          color: '#fff',   // white text for contrast
          fontSize: '0.875rem',
        },
        arrow: {
          sx: {
            color: '#333', // arrow color to match tooltip
          }
        }
      }
    }}
  >
    <span>
      <IconButton size="small">
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </span>
  </Tooltip>
  
  )} 
</Paper>

          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default MCQ;
