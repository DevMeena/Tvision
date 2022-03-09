import * as React from 'react';
import { useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { SearchContext } from '../contexts/searchContext';
import { useHistory } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {    
  
  const { currentUser, logOut, deleteUser } = useAuth()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const { search, setSearch } = useContext(SearchContext);

  const history = useHistory()

  const handleLogOut = async () => {
    try {
      await logOut()
      console.log('Successfully logged out')
      history.push('/')
    } catch {
      console.log('Failed to log out')
    }
  }

  const handleChangePassword = () => {
    history.push('/change-password')
  }

  const handleWatchlist = () => {
    history.push('/watchlist')
  }

  function searchQuery(e) {
    if(e.key === 'Enter'){
      history.push("/search/" + search)
    }
  }

  const openTrending = () => {
    history.push('/trending')
  }

  const openMovies = () => {
    history.push('/movies')
  }

  const openSeries = () => {
    history.push('/series')
  }

  const handleDeleteAccount = async () => {
    if(window.confirm("Are you sure you want to delete your account?")) {
      console.log(currentUser.uid);
      await deleteDoc(doc(db, "users", currentUser.uid)).then(async () => {
        await deleteUser(currentUser).then(()=>{
          history.push('/')
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    } else {
      console.log("No");
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu className="menu-items-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleWatchlist}>My Watchlist</MenuItem>
      <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      <MenuItem style={{"color": "red"}} onClick={handleDeleteAccount}>Delete Account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={openTrending}>
      <IconButton size="large" aria-label="Trending" color="inherit">
            <WhatshotIcon />
            </IconButton>
        <p>Trending</p>
      </MenuItem>

      <MenuItem onClick={openMovies}>
      <IconButton size="large" aria-label="Movies" color="inherit">
                   <MovieIcon />
            </IconButton>
        <p>Movies</p>
      </MenuItem>

      <MenuItem onClick={openSeries}>
      <IconButton size="large" aria-label="TV Series" color="inherit">
                 <LiveTvIcon />
            </IconButton>
        <p>TV Series</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor: "#FF005C"}} position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }} >

          <Stack direction="row" className="brand-item" style={{'cursor': 'pointer'}} alignItems="center" onClick={()=> window.scroll(0,0)} >
              
          <LocalMoviesOutlinedIcon sx={{ display: { xs: 'block', sm: 'block' }, mr: 0.7 }} />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Tvision
          </Typography>
          </Stack>
          <div className="seach-box-area">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase className="seach-box-searcher"
              placeholder="Search…"
              onKeyPress={(e) => e.key === 'Enter' && searchQuery(e)}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="Trending" color="inherit">
                <Link href="/trending" color="inherit" underline="none" > <WhatshotIcon /> </Link>
            </IconButton>
            <IconButton size="large" aria-label="Movies" color="inherit">
                
                <Link href="/movies" color="inherit" underline="none" > <MovieIcon /> </Link>
            </IconButton>
            <IconButton
              size="large"
              aria-label="TV Series"
              color="inherit"
            >
                <Link href="/series" color="inherit" underline="none" > <LiveTvIcon /> </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}