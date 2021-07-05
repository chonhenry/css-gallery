import { useState } from "react";
import styles from "../styles/Display.module.css";

export default function Display({ html, css, javascript }) {
  const displayHeight = 300;
  const displayWidth = 300;

  const srcDoc = `
  <body style="height:${300}px;margin:0">${html}</body>
  <style>${css}</style>
  <script>${javascript}</script>
`;

  return (
    <>
      <iframe
        style={{ background: "red", marginLeft: "60px" }}
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width={`${displayWidth}px`}
        height={`${displayHeight}px`}
      />
    </>
  );
}
