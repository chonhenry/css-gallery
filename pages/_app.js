import Layout from "../components/Layout";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import "../styles/globals.css";

const theme = createMuiTheme({
  palette: {
    // type: "dark",
  },
  typography: {
    fontFamily: "Share Tech Mono",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 790,
      md: 1160,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
