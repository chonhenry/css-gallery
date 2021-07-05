import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Display from "../components/Display";
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "cssDesign" });
  console.log(res);
  return {
    props: {
      css_design: res.items,
    },
  };
}

export default function Home({ css_design }) {
  // console.log(css_design);
  const router = useRouter();

  return (
    <Container>
      <Grid container spacing={3}>
        {css_design.map((design) => {
          const html = design.fields.html.content[0].content[0].value;
          const css = design.fields.css.content[0].content[0].value;
          const javascript =
            design.fields.javascript.content[0].content[0].value;

          return (
            <Grid
              item
              md={4}
              key={design.fields.slug}
              // onClick={() =>
              //   console.log("router.push(`/design/${design.fields.slug}`)")
              // }
            >
              <Link href={`/design/${design.fields.slug}`}>
                <a>{design.fields.title}</a>
              </Link>
              <Display html={html} css={css} javascript={javascript} />
            </Grid>
          );
        })}
        {/* <Grid item md={4}>
          <Display srcDoc={srcDoc} />
        </Grid>

        <Grid item md={4}>
          <Display srcDoc={srcDoc} />
        </Grid>

        <Grid item md={4}>
          <Display srcDoc={srcDoc} />
        </Grid> */}
      </Grid>
    </Container>
  );
}
