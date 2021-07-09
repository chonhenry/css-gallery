import { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Display from "../components/Display";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/Code";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { createClient } from "contentful";

const design_per_page = 6;

const useStyles = makeStyles((theme) => ({
  container: {
    // background: "pink",
  },
  grid_item: {
    // background: "lightblue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  textfield: {
    width: "80px",
    // height: "1px",
  },
}));

export async function getServerSideProps({ query: { page = 1 } }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const skip = +page === 1 ? 0 : (+page - 1) * design_per_page;

  const res = await client.getEntries({
    content_type: "cssDesign",
    order: "-sys.createdAt",
    limit: design_per_page,
    skip: skip,
  });

  return {
    props: {
      css_design: res.items,
      total_entries: res.total,
      page,
    },
  };
}

export default function Home({ css_design, total_entries, page }) {
  const [currentPage, setCurrentPage] = useState(page);
  const router = useRouter();
  const total_pages = Math.floor(total_entries / design_per_page) + 1;
  const classes = useStyles();

  const handleChange = (p) => {
    if ((p > 0 && p <= total_pages) || p === "") setCurrentPage(p);
  };

  return (
    <Container className={classes.container}>
      {/* <p>total pages: {total_pages}</p> */}

      <Grid container>
        {css_design.map((design) => {
          const html = design.fields.html.content[0].content[0].value;
          const css = design.fields.css.content[0].content[0].value;
          const javascript =
            design.fields.javascript &&
            design.fields.javascript.content[0].content[0].value;

          return (
            <Grid
              className={classes.grid_item}
              item
              xs={12}
              sm={6}
              md={4}
              // lg={3}
              key={design.fields.slug}
            >
              <div className={styles.header}>
                <a>{design.fields.title}</a>
                <Link href={`/design/${design.fields.slug}`}>
                  <CodeIcon className={styles.code_icon} />
                </Link>
              </div>
              <Display
                html={html}
                css={css}
                javascript={javascript}
                width={350}
                height={350}
              />
            </Grid>
          );
        })}
      </Grid>

      <form noValidate autoComplete="off" className={styles.btn_container}>
        <Link href={`/?page=${+page - 1}`}>
          <Button disabled={page <= 1}>
            <KeyboardArrowLeftIcon />
          </Button>
        </Link>

        <Input
          className={classes.textfield}
          id="outlined-basic"
          variant="filled"
          type="number"
          value={currentPage}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          onChange={(e) => handleChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">{` / ${total_pages}`}</InputAdornment>
          }
        />

        <Link href={`/?page=${+page + 1}`}>
          <Button disabled={total_entries - page * design_per_page <= 0}>
            <KeyboardArrowRightIcon />
          </Button>
        </Link>
      </form>
    </Container>
  );
}

// export async function getStaticProps() {
//   const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_ACCESS_KEY,
//   });

//   const res = await client.getEntries({
//     content_type: "cssDesign",
//     order: "-sys.createdAt",
//     limit: 3,
//     skip: 3,
//   });
//   return {
//     props: {
//       css_design: res.items,
//     },
//     revalidate: 1,
//   };
// }
