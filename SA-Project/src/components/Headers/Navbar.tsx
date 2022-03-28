import React, { useState, useEffect } from "react";
import { AppBar, Grid, makeStyles, Toolbar } from "@material-ui/core";

import SADrawer from "../Drawer/Drawer";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  logo: {
    maxWidth: "15rem",
    marginLeft: "0px",
  },

  appBarTransparent: {
    backgroundColor: "rgb(0,115,115)",
  },
  appBarSolid: {
    backgroundColor: "rgba(255,255,255, 0.3)",
    //backgroundColor: 'transparent',
  },
}));

const Navbar: React.FC<{}> = (props) => {
  const classes = useStyles();

  const [navBackground, setNavBackground] = useState("appBarTransparent");

  // const [click, setClick] = useState(false);
  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  // const navRef = React.useRef("");
  // navRef.current = navBackground;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 310;
      if (show) {
        setNavBackground("appBarSolid");
      } else {
        setNavBackground("appBarTransparent");
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="relative"
      className={`${classes.root}`}
      // elevation={0}
    >
      <Toolbar>
        <SADrawer />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
