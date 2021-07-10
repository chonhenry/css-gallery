import dynamic from "next/dynamic";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styles from "../styles/Code.module.css";
import js from "../public/javascript.svg";
import Image from "next/image";
import Paper from "@material-ui/core/Paper";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/xml/xml");
  require("codemirror/mode/css/css");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/markdown/markdown");
}

export default function Code({ displayName, language, value, onChange }) {
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div className={styles.container}>
      {/* <div
        className={styles.topPane}
        onClick={() => navigator.clipboard.writeText(value)}
      >
        {displayName}
        <Image
          src={`/../public/${displayName.toLowerCase()}.svg`}
          width={20}
          height={20}
        />
      </div> */}
      <Paper>
        {displayName}
        <Image
          src={`/../public/${displayName.toLowerCase()}.svg`}
          width={20}
          height={20}
        />
      </Paper>
      <ControlledEditor
        className={styles.editor}
        onBeforeChange={handleChange}
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

// navigator.clipboard.writeText(this.state.affiliate)
