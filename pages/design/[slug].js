import Code from "../../components/Code";
import Display from "../../components/Display";
import Description from "../../components/Description";
import Link from "next/link";
import { createClient } from "contentful";
import Container from "@material-ui/core/Container";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "cssDesign",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: true };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "cssDesign",
    "fields.slug": params.slug,
  });

  if (items.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      css_design: items[0],
    },
    revalidate: 1,
  };
}

export default function Design({ css_design }) {
  if (!css_design) return <div>Loading...</div>;

  const html = css_design.fields.html.content[0].content[0].value;
  const css = css_design.fields.css.content[0].content[0].value;
  const javascript = css_design.fields.javascript
    ? css_design.fields.javascript.content[0].content[0].value
    : "";
  const title = css_design.fields.title;
  const description = css_design.fields.description;

  // console.log(css_design);

  return (
    <Container>
      <Description title={title} description={description} />
      <Display html={html} css={css} javascript={javascript} />
      <br></br>
      <br></br>
      <Code displayName="HTML" language="xml" value={html} />
      <Code displayName="CSS" language="css" value={css} />
      {javascript.length > 0 && (
        <Code
          displayName="JavaScript"
          language="javascript"
          value={javascript}
        />
      )}
    </Container>
  );
}
