import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    // background: "#fefefe",
    // borderBottom: "1px solid lightgray",
  },
  space: theme.mixins.toolbar,
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  page: {
    // marginTop: 30,
    // background: "lightgray",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        className={classes.appbar}
        elevation={0}
        color="default"
      >
        {/* <Toolbar className={classes.toolbar}> */}
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.space}></div> */}
      <div className={classes.page}>{children}</div>
    </div>
  );
}
