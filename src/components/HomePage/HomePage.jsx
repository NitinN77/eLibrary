import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
import React from "react";
import './styles.css'


function HomePage() {
  return(
    <>
    <div className="section1">
      <Button variant="contained" type="submit" color="secondary" className="bt1">
        <p style={{fontSize: '20px'}}>
        <Link to="/library" style={{fontSize: '20px', textDecoration: 'none', color: 'white'}}> 
        Browse
        </Link>
        </p>
      </Button>
    </div>
    <div className="section2">yes</div>
    </>
  )
}

export default HomePage;
