import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styles from "../styles/Code.module.css";
import Image from "next/image";
import Button from "@material-ui/core/Button";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/xml/xml");
  require("codemirror/mode/css/css");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/markdown/markdown");
}

export default function Code({ displayName, language, value, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.topPane}>
        <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(value)}
        >
          <Image
            className={styles.img}
            src={`/${displayName.toLowerCase()}.svg`}
            width={25}
            height={25}
          />
          Copy to clipboard
        </Button>
      </div>

      <ControlledEditor
        className={styles.editor}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
}
