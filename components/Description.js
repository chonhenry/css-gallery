import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 20,
  },
  description: {
    width: 600,
    maxHeight: 200,
    margin: "auto",
    marginBottom: 20,
    overflow: "auto",
  },
}));

export default function Description({ title, description }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h3" align="center">
        {title}
      </Typography>

      {!description && <br />}

      {description && (
        <Typography
          className={classes.description}
          variant="body2"
          align="center"
        >
          {documentToReactComponents(description)}
        </Typography>
      )}
    </>
  );
}
