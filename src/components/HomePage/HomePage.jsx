import { Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'
import React from "react";
import './styles.css'


function HomePage() {
  return(
    <>
    <div className="section1">
      <h1 className="hed1"><p>Read your favorite textbooks</p> <p>and novels from the comfort of your home</p></h1>
      <Button variant="contained" type="submit" color="secondary" className="bt1">
        <Typography style={{fontSize: '20px'}}>
        <Link to="/library" style={{fontSize: '20px', textDecoration: 'none', color: 'white', fontWeight: 'bold'}}> 
        Browse
        </Link>
        </Typography>
      </Button>
    </div>
    <div className="section2"></div>
    </>
  )
}

export default HomePage;
