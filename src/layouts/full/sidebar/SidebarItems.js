import React, {useState} from "react";
import { useLocation, NavLink, useNavigate } from "react-router";
import { Box, Button, List, ListItemButton, ListItemIcon,ListItemText } from "@mui/material";
// import Link from "react-router";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from "@tabler/icons-react";
import Menuitems from "./MenuItems";
// import logoicn from "../../../assets/images/logos/dark1-logo.svg";
import logoicn from "../../../assets/images/logos/logo-migoo.svg";
import logoicndark from "../../../assets/images/logos/logo-migoo-dark.svg";

import Upgrade from "./Upgrade";
import { useThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/authSlice";

const renderMenuItems = (items, pathDirect) => {
    const { t } = useTranslation();

  return items.map((item) => {
    const Icon = item.icon ? item.icon : IconPoint;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    /* Section header ---------------------------------------------------- */
    if (item.subheader) {
      return (
        <Box
          sx={{ margin: "0 -24px", textTransform: "uppercase" }}
          key={item.subheader}
        >
          <Menu subHeading={t(item.i18n || item.subheader)} />
        </Box>
      );
    }

    /* Nested submenu ---------------------------------------------------- */
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={t(item.i18n)}
          icon={itemIcon}
          borderRadius="7px"
        >
          {renderMenuItems(item.children, pathDirect, t)}
        </Submenu>
      );
    }

    /* Leaf menu item ---------------------------------------------------- */
    return (
      <MenuItem
        key={item.id}
        isSelected={pathDirect === item.href}
        icon={itemIcon}
        component={NavLink}
        link={item.href || "#"}
        badge={!!item.chip}
        badgeContent={item.chip}
        badgeColor="secondary"
        badgeTextColor="#49BEFF"
        disabled={item.disabled}
        borderRadius="7px"
      >
        {t(item.i18n)}
      </MenuItem>
    );
  });
};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;
  const { isDarkMode } = useThemeContext();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

    const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };
  
  const renderMenuItems = (items) =>
    items.map((item) => {
      const Icon = item.icon || IconPoint;
      const iconElement = <Icon stroke={1.5} size="1.3rem" />;

      if (item.subheader) {
        return (
          <Box
            key={item.subheader}
            sx={{
              margin: '16px 0 8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: 'text.secondary',
              px: 2,
              direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'left' : 'left',
            }}
          >
            {t(item.i18n || item.subheader)}
          </Box>
        );
      }

      if (item.children) {
        const isOpen = openMenus[item.id] || false;
        return (
          <Box key={item.id}>
            <ListItemButton
              onClick={() => toggleMenu(item.id)}
              sx={{
                borderRadius: '7px',
                px: 2,
                py: 1,
                direction: isRTL ? 'rtl' : 'ltr',
                justifyContent: 'flex-start',
                display: 'flex',
                flexDirection: 'row',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              {/* Icon (chevron) on right for RTL, left for LTR */}
              {isRTL && (
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    color: 'text.primary',
                    mr: 1,
                    ml: 1,
                    justifyContent: 'center',
                  }}
                >
                  {isOpen ? (
                    <IconChevronUp stroke={1.5} size="1.3rem" />
                  ) : (
                    <IconChevronDown stroke={1.5} size="1.3rem" />
                  )}
                </ListItemIcon>
              )}

              {/* Text with proper RTL alignment */}
              <ListItemText
                primary={t(item.i18n)}
                sx={{
                  display: 'flex',
                  justifyContent: isRTL ? 'flex-end' : 'flex-start',
                  textAlign: isRTL ? 'left' : 'left',
                  pl: isRTL ? 0 : 1,
                  pr: isRTL ? 1 : 0,
                  flex: 1,
                }}
                primaryTypographyProps={{
                  sx: {
                    textAlign: isRTL ? 'left' : 'left',
                    width: '100%',
                  },
                }}
              />

              {!isRTL && (
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    color: 'text.primary',
                    ml: 1,
                    mr: 1,
                    justifyContent: 'center',
                  }}
                >
                  {isOpen ? (
                    <IconChevronUp stroke={1.5} size="1.3rem" />
                  ) : (
                    <IconChevronDown stroke={1.5} size="1.3rem" />
                  )}
                </ListItemIcon>
              )}
            </ListItemButton>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ pl: isRTL ? 0 : 4, pr: isRTL ? 4 : 0 }}
              >
                {renderMenuItems(item.children)}
              </List>
            </Collapse>
          </Box>
        );
      }

      // Single link item
      return (
        <ListItemButton
          key={item.id}
          component={NavLink}
          to={item.href || '#'}
          selected={pathDirect === item.href}
          disabled={item.disabled}
          sx={{
            borderRadius: '7px',
            px: 2,
            py: 1,
            direction: isRTL ? 'rtl' : 'ltr',
            justifyContent: 'flex-start',
            display: 'flex',
            flexDirection: 'row',
            textDecoration: 'none',

            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '& .MuiListItemIcon-root': {
                color: 'primary.contrastText',
              },

              // 👇 Hover effect for selected item
              '&:hover': {
                bgcolor: 'primary.dark',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            },

            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          {/* Icon left in LTR, right in RTL */}
          {!isRTL && (
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                mr: 1,
                ml: 1,
                justifyContent: 'center',
                color: 'text.primary',
              }}
            >
              {item.chip ? (
                <Badge
                  badgeContent={item.chip}
                  color="secondary"
                  sx={{ '& .MuiBadge-badge': { fontWeight: 'bold', color: '#49BEFF' } }}
                >
                  {iconElement}
                </Badge>
              ) : (
                iconElement
              )}
            </ListItemIcon>
          )}

          {/* Text with proper RTL alignment */}
          <ListItemText
            primary={t(item.i18n)}
            sx={{
              display: 'flex',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              textAlign: isRTL ? 'left' : 'left',
              pl: isRTL ? 0 : 1,
              pr: isRTL ? 1 : 0,
              flex: 1,
            }}
            primaryTypographyProps={{
              sx: {
                textAlign: isRTL ? 'left' : 'left',
                width: '100%',
              },
            }}
          />

          {/* Icon right in RTL */}
          {isRTL && (
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                ml: 1,
                mr: 1,
                justifyContent: 'center',
                color: 'text.primary',
              }}
            >
              {item.chip ? (
                <Badge
                  badgeContent={item.chip}
                  color="secondary"
                  sx={{ '& .MuiBadge-badge': { fontWeight: 'bold', color: '#49BEFF' } }}
                >
                  {iconElement}
                </Badge>
              ) : (
                iconElement
              )}
            </ListItemIcon>
          )}
        </ListItemButton>
      );
    });

  return (
    <Box sx={{ px: 3, overflowX: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Logo */}
      <Box sx={{ margin: '0 -24px', mb: 2, textAlign: 'center' }}>
        <NavLink to="/">
          <Box
            component="img"
            src={isDarkMode ? logoicndark : logoicn}
            alt="Logo"
            sx={{ height: 48, width: 'auto', mx: 'auto', mt: 3 }}
          />
        </NavLink>
      </Box>

      {/* Menu */}
      <List disablePadding>{renderMenuItems(Menuitems)}</List>

      {/* Logout button */}
      <Box mt={1} py={1} px={2}>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="primary"
          component={NavLink}
          fullWidth
          sx={{ borderRadius: '7px' }}
        >
          {t("menu.logout")}
        </Button>
      </Box>
      {/* <Upgrade /> */}
    </Box>
  );
};

export default SidebarItems;
