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
import { createClient } from "contentful";

const design_per_page = 4;

const useStyles = makeStyles((theme) => ({
  container: {
    // background: "pink",
  },
  grid_item: {
    // background: "lightblue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // margin: "1px",
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
  const router = useRouter();
  const total_pages = Math.floor(total_entries / design_per_page) + 1;
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <br></br>
      {total_entries - page * design_per_page > 0 && (
        <Link href={`/?page=${+page + 1}`}>
          <Button variant="outlined">Next Page</Button>
        </Link>
      )}
      {page > 1 && (
        <Link href={`/?page=${+page - 1}`}>
          <Button variant="outlined">Previous Page</Button>
        </Link>
      )}
      {/* <br></br>
      <br></br> */}
      {/* <p>total pages: {total_pages}</p> */}
      {/* <br></br>
      <br></br> */}
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
              lg={3}
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
                width={300}
                height={300}
              />
            </Grid>
          );
        })}
      </Grid>
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
