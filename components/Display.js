import styles from "../styles/Display.module.css";

export default function Display({
  html,
  css,
  javascript,
  width = 500,
  height = 500,
}) {
  const srcDoc = `
  <body style="height:${height}px;margin:0">${html}</body>
  <style>${css}</style>
  <script>${javascript}</script>
`;

  return (
    <div className={styles.container}>
      <iframe
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
