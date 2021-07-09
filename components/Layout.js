import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import GitHubIcon from "@material-ui/icons/GitHub";

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
  form: {
    width: "60%",
  },
  search_input: {
    height: "30px",
    width: "100%",
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "30px",
    cursor: "pointer",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    router.push(`?search=${search}`);
    setSearch("");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        className={classes.appbar}
        elevation={0}
        color="default"
      >
        <Toolbar className={classes.toolbar}>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <OutlinedInput
              id="outlined-adornment-weight"
              className={classes.search_input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search CSS Design"
            />
          </form>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.space}></div> */}
      <div className={classes.page}>{children}</div>
      <div className={classes.footer}>
        <a
          href="https://github.com/chonhenry/css-gallery"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon className={classes.icon} />
        </a>
      </div>
    </div>
  );
}
