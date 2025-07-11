import React from 'react'
import { Box, FormGroup, FormControlLabel, Switch, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
const EmailNotifications = () => {
  const {t} = useTranslation()
  return (
    <>
    <Stack>
            <Box>
              <FormGroup>
                <FormControlLabel
                  value="promotional_emails"
                  control={<Switch color="primary" />}
                  label={t("settings.emailNotifications.promotional")}
                //   labelPlacement="start"
                />
                  <FormControlLabel
                  value="studying_progress_emails"
                  control={<Switch color="primary" />}
                  label={t("settings.emailNotifications.studyProgress")}

                  // label="Studying progress emails"
                //   labelPlacement="start"
                />
                  <FormControlLabel
                  value="news_update"
                  control={<Switch color="primary" />}
                  label={t("settings.emailNotifications.newsUpdate")}
                  // label="News update"
                //   labelPlacement="start"
                />
              </FormGroup>
            </Box>
    </Stack>
    </>
  )
}

export default EmailNotifications