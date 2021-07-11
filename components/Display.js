import { useState } from "react";
import styles from "../styles/Display.module.css";
import Container from "@material-ui/core/Container";

export default function Display({
  html,
  css,
  javascript,
  width = 500,
  height = 500,
}) {
  // const displayHeight = 300;
  // const displayWidth = 300;

  const srcDoc = `
  <body style="height:${height}px;margin:0">${html}</body>
  <style>${css}</style>
  <script>${javascript}</script>
`;

  return (
    <div className={styles.container}>
      <iframe
        // style={{ background: "red", marginLeft: "60px" }}
        className={styles.display}
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width={`${width}px`}
        height={`${height}px`}
      />
    </div>
  );
}
