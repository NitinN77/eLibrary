import {React, useState, useEffect} from "react";
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

function timeDiffCalc(dateFuture, dateNow) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  let difference = '';
  if (days > 0) {
    difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  }
  difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
  difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 
  return difference;
}


function Borrowed() {
  const classes = useStyles();
  const [{ borrowed, user }] = useStateValue();
  const [btime, setBtime] = useState(null)
  

  const returnborrowed = () => {
    db
    .collection('borrowed')
    .doc(user.email)
    .set({
      borrowed: [],
    })

    db.collection('userdata')
    .doc(user.email)
    .set({
      borrowedTime: '',
    })
    alert("Books Returned")

  }

  const fetchtime = async () => {
    let rdata = await db.collection("userdata").doc(user.email).get();
    rdata = rdata.data().borrowedTime
    if (!rdata) {
      setBtime('')
      return
    }
    const diff = new Date(rdata)
    if(diff - new Date() <= 0) {
      returnborrowed()
      alert('Your borrow time has ended and the books were returned')
    }
    setBtime(timeDiffCalc(diff ,new Date()))
  }

  useEffect(() => {
    if(user){
      fetchtime()
    }
    
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  return (

    <div style={{ marginTop: "100px" }}>
    <div className={classes.topsection}>
    <Typography variant="h4" style={{paddingBottom: '50px', marginLeft: '50px', color: 'white'}}>Borrowed</Typography>
    {btime ? <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h4>Time left before return: </h4><h2>{btime && btime.toString()}</h2>
      </div> : null}
    <Button color="secondary" variant="contained" onClick={()=>{returnborrowed()}} style={{height: '40px', marginRight: "76px"}}>
              Return All 
    </Button>
    </div>

    <Grid item container justify="center" spacing={3} lg={12}>
      {borrowed.map((book) => (
        <Card className={classes.root} key={book.name}>
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
