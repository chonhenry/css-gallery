import styles from "../styles/Description.module.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Typography from "@material-ui/core/Typography";

export default function Description({ title, description }) {
  return <div>{documentToReactComponents(description)}</div>;
}

{
  /* <div>{documentToReactComponents(css_design.fields.description)}</div> */
}
