import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import HeadingTitle from "../../components/headingtitle/HeadingTitle";
import PersonalInformation from "./components/PersonalInformation";
import LanguagePreferences from "./components/LanguagePreferences";
import DisplaySettings from "./components/DisplaySettings";
import EmailNotifications from "./components/EmailNotifications";
import SubscriptionPlan from "./components/SubscriptionPlan";
import { Button, Typography, Alert } from "@mui/material";
import { getProfile, updateProfile } from "../../redux/features/authSlice";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  console.log(user)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

   useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const isRtl = i18n.language === "he";

  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const handleSave = async () => {
    const hasData = formData.first_name || formData.last_name || formData.email;
    if (!hasData) {
      return;
    }

    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
    } catch (err) {}
  };

  return (
    <>
      <HeadingTitle
        title={t("settings.personalInformation.title")}
        subtitle={t("settings.personalInformation.subtitle")}
      />
      <PersonalInformation onFormChange={handleFormChange} profile={user?.profile} />

      <HeadingTitle
        title={t("settings.subscriptionPlan.title")}
        subtitle={t("settings.subscriptionPlan.subtitle")}
      />
      <SubscriptionPlan />

      <HeadingTitle
        title={t("settings.emailNotifications.title")}
        subtitle={t("settings.emailNotifications.subtitle")}
      />
      <EmailNotifications />

      <HeadingTitle
        title={t("settings.displaySettings.title")}
        subtitle={t("settings.displaySettings.subtitle")}
      />
      <DisplaySettings />

      <HeadingTitle
        title={t("settings.languagePreferences.title")}
        subtitle={t("settings.languagePreferences.subtitle")}
      />
      <LanguagePreferences />

      {/* <div
        style={{
          marginTop: "50px",
          direction: isRtl ? "rtl" : "ltr",
          textAlign: isRtl ? "right" : "left",
        }}
      > */}
      {/* <div style={{ marginTop: '50px', direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
        <div>
          <Typography variant="h4">
            {t("settings.savePreferences.heading")}
          </Typography>
          <Typography variant="h6" mt={2}>
            {t("settings.savePreferences.subheading")}
          </Typography>
        </div>
      </div> */}

      {/* <Button
        variant="contained"
        style={{ margin: "20px 0px" }}
        onClick={handleSave}
        disabled={loading}
      >
        {loading
          ? t("settings.savePreferences.saving")
          : t("settings.savePreferences.button")}
      </Button> */}
     
    </>
  );
};

export default Settings;
