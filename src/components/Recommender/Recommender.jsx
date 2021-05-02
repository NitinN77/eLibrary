import { React, useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@material-ui/core";

const Recommender = () => {
  const [apiret, setApiret] = useState({});
  const [title, setTitle] = useState("Insurgent");
  const [genre, setGenre] = useState("Non-Fiction");
  const [books, setBooks] = useState([]);

  const getRecomms = (e) => {
    
    axios
      .get(`http://127.0.0.1:5000/?key1=${title}&key2=${genre}`)
      .then((res) => {
        const resp = res.data.data[2];
        setApiret(Object.values(resp));

      });
      console.log(apiret);
      e.preventDefault()
  };

  return (
    <div style={{ marginTop: "120px", marginLeft: "50px" }}>
      <h1>Recommender</h1>
      <form noValidate style={{ marginTop: "30px", marginBottom: "30px" }}>
        <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
        <TextField
          style={{ marginLeft: "30px" }}
          id="outlined-basic"
          label="Genre"
          variant="outlined"
          onChange={(e) => setGenre(e.target.value)}
        />
        <p></p>
        <Button
          style={{ marginTop: "30px" }}
          variant="contained"
          type="submit"
          color="primary"
          onClick={(e) => getRecomms(e)}
        >
          Recommend
        </Button>
      </form>
      <Grid container justify="center" spacing={6} lg={12}>
          {apiret.map(book => (
              <Grid item>
                  <h2>{book.title}</h2>
                  <br />
                  <img src={book.image_link} />
              </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Recommender;
