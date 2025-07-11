import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../context/ThemeContext";

const DisplaySettings = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeContext();   // <- from your ThemeToggleButton

  // map the context boolean to the string values our radios use
  const currentValue = isDarkMode ? "dark" : "light";

  const handleChange = (event) => {
    const nextValue = event.target.value;
    // Only toggle when the user actually changes the radio
    if ((nextValue === "dark") !== isDarkMode) {
      toggleTheme();              // flip the theme in context / MUI ThemeProvider
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t("settings.displaySettings.title")}</FormLabel>

      <RadioGroup
        column
        name="display-mode"
        value={currentValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="light"
          control={<Radio />}
          label={t("settings.displaySettings.light")}
        />
        <FormControlLabel
          value="dark"
          control={<Radio />}
          label={t("settings.displaySettings.dark")}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default DisplaySettings;
