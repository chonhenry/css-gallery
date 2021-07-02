import dynamic from "next/dynamic";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styles from "../styles/Code.module.css";

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
      <div className={styles.topPane}>{displayName}</div>
      <ControlledEditor
        className="editor"
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
