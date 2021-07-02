import Code from "../../components/Code";
import { useState } from "react";

export default function Design() {
  const [html, setHtml] = useState(
    "<h1>vsdvkjndv</h1>\n<h1><p>advsdvvsdvsd</p></h1>"
  );
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("let a = 1");

  return (
    <div>
      <Code displayName="HTML" language="xml" value={html} onChange={setHtml} />
      <Code displayName="CSS" language="css" value={css} onChange={setCss} />
      <Code
        displayName="JavaScript"
        language="javascript"
        value={javascript}
        onChange={setJavascript}
      />
    </div>
  );
}
