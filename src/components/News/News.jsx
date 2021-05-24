import { React, useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./styles";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const News = () => {
  const classes = useStyles();

  const [topic, setTopic] = useState("datascience");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/news?topic=${topic}`)
      .then((res) => {
        let newsdata = res.data;
        newsdata = newsdata.slice(0, 8);
        setArticles(newsdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topic]);

  return (
    <div className={classes.bg}>
      <div className={classes.topics}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTopic("datascience")}
        >
          Data Science
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTopic("webdev")}
        >
          Web Development
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTopic("appdevelopment")}
        >
          App Development
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTopic("programming")}
        >
          Programming
        </Button>
      </div>

      <div className={classes.news}>
        <Grid container spacing={3}>
          {articles.map(art => (
              <Grid item lg={3}>
              <Card >
                <CardActionArea>
                  <CardMedia
                    image={art[1]}
                    style={{height: 140, width: 160}}
                  />
                  <CardContent style={{height: '200px'}}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {art[0]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <a href={art[2]} style={{textDecoration: 'none', color: 'blue'}}
                    target="_blank" rel="noopener noreferrer"
                    >Learn more</a>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default News;
