import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useStateValue } from "../../StateProvider";
import logo from "../../assets/navlogo.svg";
import { Link, useLocation } from "react-router-dom";
import { auth } from '../../firebase';

import useStyles from "./styles";

function Navbar() {
  const classes = useStyles();
  const location = useLocation();
  const [{ cart, user }] = useStateValue();

  const handleSignOut = () => {
    auth.signOut();
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img src={logo} alt="" height="25px" className={classes.image} />
            Beast Store
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={cart ? cart.total_items : 0} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              
            </div>
          )}
          { user ? (<Typography variant="h6" style={{padding: '23px'}}>{user.email}</Typography>) : null}
          {" "}
          { user ? 
          (<Button color="secondary" variant="contained" onClick={handleSignOut}>
            Sign Out
          </Button>)
           : 
          (
            <Button color="secondary" variant="contained" href="/login">
              Sign In 
            </Button>
            )
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
