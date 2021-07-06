import Code from "../../components/Code";
import Display from "../../components/Display";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "contentful";

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

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "cssDesign",
    "fields.slug": params.slug,
  });

  return {
    props: {
      css_design: items[0],
      revalidate: 1,
    },
  };
}

export default function Design({ css_design }) {
  const html = css_design.fields.html.content[0].content[0].value;
  const css = css_design.fields.css.content[0].content[0].value;
  const javascript = css_design.fields.javascript
    ? css_design.fields.javascript.content[0].content[0].value
    : "";

  console.log(html);

  const srcDoc = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
    </html>
  `;

  return (
    <div>
      <Link href="/">
        <a>Home Page</a>
      </Link>
      <Code displayName="HTML" language="xml" value={html} />
      <Code displayName="CSS" language="css" value={css} />
      {javascript.length > 0 && (
        <Code
          displayName="JavaScript"
          language="javascript"
          value={javascript}
        />
      )}
      <Display html={html} css={css} javascript={javascript} />
    </div>
  );
}
