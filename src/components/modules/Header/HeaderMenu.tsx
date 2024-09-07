import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import { NAV_URL } from '../Content/global';
import KeyIcon from '@mui/icons-material/Key';

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/');
          }}>
          <HomeIcon color='inherit' sx={{ marginRight: '5px' }} />
          Homepage
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            navigate(NAV_URL.PRODUCT_PAGE);
          }}>
          <FormatListBulletedIcon color='inherit' sx={{ marginRight: '5px' }} />
          List of products
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(NAV_URL.ADD_PROTUDCT);
          }}>
          <AddIcon color='error' sx={{ marginRight: '5px' }} />
          Add product
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(NAV_URL.SECRET);
          }}>
          <KeyIcon color='error' sx={{ marginRight: '5px' }} />
          Secret page
        </MenuItem>
      </Menu>
    </nav>
  );
}
