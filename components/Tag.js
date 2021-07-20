import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tag: {
    marginRight: 20,
    display: "inline-block",
    border: "1px solid black",
    padding: "0px 10px",
    cursor: "pointer",
  },
}));

export default function Tag({ tag }) {
  const classes = useStyles();
  const router = useRouter();

  const handleClick = () => {
    // console.log(tag);
    router.push(`/?search=${tag}`);
  };

  return (
    <Typography
      className={classes.tag}
      variant="caption"
      align="center"
      gutterBottom
      noWrap
      onClick={() => handleClick()}
    >
      {tag}
    </Typography>
  );
}
