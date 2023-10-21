import React, { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useRouter } from "next/router";
import classes from "./Navbar.module.css";

const pages = [
  "Breed List",
  "Dog Database",
  "Show Results",
  "Club Directory",
  "Judges Directory",
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedeMenu, setSelectedeMenu] = useState("breed-list");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className={classes.navbar} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <img className="logo" src="/images/logo.svg" alt="Pawsitiv" />
          <Link href="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
              }}
            >
              PAWSITIV
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              className={classes.box}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={"/" + page.toLowerCase().replace(" ", "-")}>
                    <Typography
                      textAlign="center"
                      className={
                        router.pathname === `/${page.toLowerCase().replace(" ", "-")}`
                          ? classes.active
                          : ''
                      }
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/blog">
                  <Typography textAlign="center">Blogs</Typography>
                </a>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Link href="/add-result" className={classes.AddBtn}  >
            <Button
              color="inherit"
              variant="outlined"
              endIcon={<AddCircleSharpIcon />}
              sx={{
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              }}
            >
              Add Result
            </Button>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={"/" + page.toLowerCase().replace(" ", "-")}
              >
                <Button
                  className={
                    router.pathname === `/${page.toLowerCase().replace(" ", "-")}`
                      ? classes.active
                      : ''
                  }
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}

            <a href="https://www.pawsitiv.dog/blog">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                textAlign="center"
              >
                Blogs
              </Button>
            </a>
          </Box>

          <Link href="/add-result" className={classes.AddBtn}  >
            <Button
              color="inherit"
              variant="outlined"
              // endIcon={<AddCircleSharpIcon sx={{display:{lg:"flex", md:"none"}}} />}
              endIcon={<AddCircleSharpIcon />}
              sx={{
                // display: { lg: "flex", md: "flex", sm:"none",xs:"none" },
                display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              }}
            >
              Add Result
            </Button>
            <AddCircleSharpIcon
              sx={{
                display: { lg: "none", md: "flex", sm: "none", xs: "none" },
                fontSize: 35,
              }}
            />
          </Link>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
