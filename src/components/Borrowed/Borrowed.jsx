import React from "react";
import { useStateValue } from "../../StateProvider";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { db } from '../../firebase'

function Borrowed() {
  const classes = useStyles();
  const [{ borrowed, user }] = useStateValue();

  const returnborrowed = () => {
    db
    .collection('users')
    .doc(user.email)
    .set({
      borrowed: [],
    })
    alert("Books Returned")
  }

  return (

    <div style={{ marginTop: "100px" }}>
    <div className={classes.topsection}>
    <Typography variant="h4" style={{paddingBottom: '50px', marginLeft: '50px'}}>Borrowed</Typography>
    <Button color="secondary" variant="contained" onClick={()=>{returnborrowed()}} style={{height: '40px', marginRight: "76px"}}>
              Return All 
    </Button>
    </div>

    <Grid item container justify="center" spacing={3} lg={12}>
      {borrowed.map((book) => (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={book.media.source}
            title={book.name}
          />

          <div className={classes.cardContent1}>
            <CardContent>
              <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  {book.name}
                </Typography>   
              </div>
              <Typography
                dangerouslySetInnerHTML={{ __html: book.description }}
                variant="body2"
                color="textSecondary"
              />
            </CardContent>
          </div>
        </Card>
      ))}
      </Grid>
    </div>
  );
}

export default Borrowed;
