'use client';
import { Typography } from "@mui/material";
import {Grid2} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Grid2
    //   pt={6}
    //   pb={3}
      m={5}
      textAlign="center"
      container
      justifyContent={"space-between"}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid2 xs={12} sm={12} md={4}>
        <Typography>
          © {new Date().getFullYear()} {t("footer.rights")}
        </Typography>
      </Grid2>
      <Grid2 xs={12} sm={12} md={4}>
        <NavLink to="/privacy-policy" style={{ textDecoration: 'none' }}>
          <Typography>{t("footer.privacyPolicy")}</Typography>
        </NavLink>
      </Grid2>
      <Grid2 xs={12} sm={12} md={4}>
        <NavLink to="/terms-and-conditions" style={{ textDecoration: 'none' }}>
          <Typography>{t("footer.terms")}</Typography>
        </NavLink>
      </Grid2>
    </Grid2>
  );
};

export default Footer;
