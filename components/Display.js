import { useState } from "react";
import styles from "../styles/Display.module.css";

export default function Display({
  html,
  css,
  javascript,
  width = 600,
  height = 600,
}) {
  // const displayHeight = 300;
  // const displayWidth = 300;

  const srcDoc = `
  <body style="height:${height}px;margin:0">${html}</body>
  <style>${css}</style>
  <script>${javascript}</script>
`;

  return (
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
  );
}
