import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  space: theme.mixins.toolbar,
  toolbar: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
  },
  form: {
    width: 300,
    marginLeft: "auto",
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
  link: {
    width: 100,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    cursor: "pointer",
    marginRight: "auto",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    router.push(`/?search=${search}`);
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
          <Link href="/">
            <a>CSS GALLERY</a>
          </Link>
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

      <div className={classes.page}>{children}</div>
      <div className={classes.footer}>
        <a
          href="https://github.com/chonhenry/css-gallery"
          target="_blank"
          rel="noreferrer"
          className={classes.link}
        >
          <GitHubIcon className={classes.icon} />
          View Code
        </a>
      </div>
    </div>
  );
}
