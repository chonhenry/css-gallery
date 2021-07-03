import { useState } from "react";
import styles from "../styles/Display.module.css";

export default function Display({ title, html, css, javascript }) {
  const srcDoc = `
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${javascript}</script>
  </html>
`;

  return (
    <>
      <p>{title}</p>
      <iframe
        style={{ background: "red" }}
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="300px"
        height="300px"
      />
    </>
  );
}
