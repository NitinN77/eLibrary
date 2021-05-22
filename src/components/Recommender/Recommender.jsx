import { React, useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab"

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

  useEffect(() => {
    console.log();
  }, [])
  

  return (
    <div style={{ marginTop: "120px", marginLeft: "50px" }}>
      <h1>Recommender</h1>
      <div style={{ marginTop: "30px", marginBottom: "20px", display: 'flex', flexDirection: 'row'}}>
      <FormControl noValidate  variant="outlined" style={{marginRight: '20px'}}>
      <InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
       <Select
          style={{ width: '280px'}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Genre"
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete

      id="combo-box-demo"
      options={require('../../static/books')}
      style={{ width: 300 }}
      value={title}
      onChange={(e, value) => setTitle(value)}
      renderInput={(params) => <TextField {...params} label="Title" variant="outlined" />}
      />
      </div>
      <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={(e) => getRecomms(e)}
          style={{marginBottom: '20px'}}
        >
          Recommend
        </Button>
      <Grid container justify="center" spacing={9}>
          {apiret.length ? apiret.map(book => (
              <Grid item key={book.id} lg={4}>
                  <h2>{book.title}</h2>
                  <br />
                  <img src={book.image_link} />
              </Grid>
          )) : <div></div>}
      </Grid>
    </div>
  );
};

export default Recommender;
