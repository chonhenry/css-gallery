import Layout from "../components/Layout";
// import theme from "../components/theme";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import "../styles/globals.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    // primary: purple,
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
