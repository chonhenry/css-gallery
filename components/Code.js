import dynamic from "next/dynamic";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import styles from "../styles/Code.module.css";
import js from "../public/javascript.svg";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/xml/xml");
  require("codemirror/mode/css/css");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/markdown/markdown");
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 800,
    borderRadius: 0,
    display: "flex",
  },
}));

export default function Code({ displayName, language, value, onChange }) {
  const classes = useStyles();

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
