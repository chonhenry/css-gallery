import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Display from "../components/Display";
import Button from "@material-ui/core/Button";
import { createClient } from "contentful";

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

const design_per_page = 2;

export async function getServerSideProps({ query: { page = 1 } }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  // const design_per_page = 2;
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
  console.log(total_entries);

  return (
    <Container>
      <br></br>
      {total_entries - page * design_per_page > 0 && (
        <Link href={`/?page=${+page + 1}`}>
          <Button variant="outlined" color="primary">
            Next Page
          </Button>
        </Link>
      )}
      {page > 1 && (
        <Link href={`/?page=${+page - 1}`}>
          <Button variant="outlined" color="primary">
            Previous Page
          </Button>
        </Link>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid container spacing={3}>
        {css_design.map((design) => {
          const html = design.fields.html.content[0].content[0].value;
          const css = design.fields.css.content[0].content[0].value;
          const javascript =
            design.fields.javascript &&
            design.fields.javascript.content[0].content[0].value;

          return (
            <Grid item md={4} key={design.fields.slug}>
              <Link href={`/design/${design.fields.slug}`}>
                <a>{design.fields.title}</a>
              </Link>
              <Display html={html} css={css} javascript={javascript} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
