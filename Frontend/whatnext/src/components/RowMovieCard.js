import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "220px",
    height: "420px",
    backgroundColor: "#1b1e26",
    border: "1px solid #333844",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      borderColor: "#e3b341",
      boxShadow: "0 16px 32px rgba(0, 0, 0, 0.45)",
    },
  },
  root_wrapper: {
    width: "auto",
  },
  card_title: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    color: "#e3b341",
  },
  card_content: {
    color: "#9aa1ad",
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  image_cover: {
    height: "300px",
  },
});

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

function RowMovieCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root_wrapper}>
      <CardActionArea>
        <Card className={classes.root}>
          <CardMedia
            className={classes.image_cover}
            component="img"
            alt={props.title || props.original_title}
            height="100"
            image={`${BASE_IMAGE_URL}${props.poster_path}`}
            title={props.title || props.original_title}
          />
          <CardContent style={{ padding: "10px" }}>
            <Typography
              className={classes.card_title}
              gutterBottom
              variant="h6"
              component="h6"
            >
              {props.title || props.original_title}
            </Typography>
            <Typography
              className={classes.card_content}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <b>Rating:</b> {props.vote_average}/10 ({props.vote_count} votes)
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
}

export default RowMovieCard;
