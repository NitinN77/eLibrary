import { React, useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";

const News = () => {
  const classes = useStyles();

  const [topic, setTopic] = useState("datascience");
  const [articles, setArticles] = useState([]);

  const fetchdata = () => {
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
  }

  useEffect(() => {
    fetchdata()
  }, [topic]); // eslint-disable-line react-hooks/exhaustive-deps

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
          onClick={() => setTopic("engineering")}
        >
          Engineering
        </Button>
      </div>

      <div className={classes.news}>
        <Grid container spacing={3}>
          {articles.map(art => (
              <Grid item lg={6} key={art[2]}>
              <Card className={classes.root} variant="outlined">
            <CardMedia className={classes.media} image={art[1]}/>

            <div className={classes.cardContent1}>
            <CardContent>
                <div className={classes.cardContent}>
                    <a href={art[2]} style={{marginBottom: '10px', color: 'black'}}>
                        <h3>{art[0]}</h3>
                    </a>
                </div>                <br /><br />
            </CardContent>
            </div>
            
        </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default News;
