import { React, useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const Recommender = () => {
  const [apiret, setApiret] = useState({});
  const [title, setTitle] = useState("Insurgent");
  const [genre, setGenre] = useState("Non-Fiction");

  const getRecomms = (e) => {
    axios
      .get(`http://127.0.0.1:5000/?key1=${title}&key2=${genre}`)
      .then((res) => {
        const resp = res.data.data[2];
        setApiret(resp);
      });
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
      {apiret.title ? (
        <p>
          {Object.values(apiret.title).map((title) => (
            <p>{title}</p>
          ))}
          {Object.values(apiret.image_link).map((img) => (
            <img src={img}/>
          ))}
        </p>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Recommender;
