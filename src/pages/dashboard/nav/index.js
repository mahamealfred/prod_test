import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
//import account from '../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
 import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//

//import navConfig from './config';
import AuthContext from '../../../context';
import SvgColor from '../../../components/svg-color';
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
// ----------------------------------------------------------------------
const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { t } = useTranslation(["home","common","login"]);
  const { pathname } = useLocation();
const {auth}=useContext(AuthContext)
  const isDesktop = useResponsive('up', 'lg');

  const navConfig = [
    {
      title: `${t("common:services")}`,
      path: '/dashboard',
      icon: icon('ic_analytics'),
    },
    {
      title: `${t("common:myaccount")}`,
      path: '/dashboard/my-account',
      icon: icon('ic_user'),
    },
    {
      title: `${t("common:preioustransaction")}`,
      path: '/dashboard/previous-transactions',
      icon: icon('ic_disabled'),
    },
    {
      title: `${t("common:previousdeposittransactions")}`,
      path: '/dashboard/previous-deposit-transactions',
      icon: icon('ic_disabled'),
    },
    {
      title: 'FAQ',
      path: '/dashboard/faq',
      icon: icon('ic_blog'),
    },
    {
      title: `${t("common:changepassword")} `,
      path: '/dashboard/change-pin',
      icon: icon('ic_lock'),
    },
  
  ];





  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            {/* <Avatar  alt="photoURL" /> */}
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {auth.names}
              </Typography>

              <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
              {t("common:agent")} 
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig } />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="../../images/img_144.png"
            sx={{ width: 80, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
           MobiCash
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {'Copyright © '}
      <Link color="inherit" href="https://www.mobicashonline.com/">
      www.mobicashonline.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
