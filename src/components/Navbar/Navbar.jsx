import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
} from "@material-ui/core";
import { ShoppingBasket, Book } from "@material-ui/icons";
import { useStateValue } from "../../StateProvider";
import logo from "../../assets/navlogo.svg";
import { Link, useLocation } from "react-router-dom";
import { auth } from '../../firebase';
import { commerce } from "../../lib/commerce";
import useStyles from "./styles";


function Navbar() {
  const classes = useStyles();
  const location = useLocation();
  const [{ cart, user, borrowed },dispatch] = useStateValue();

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    dispatch({type: 'SET_CART', data: cart});
  };

  const handleSignOut = () => {
    auth.signOut();
    handleEmptyCart();
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <img src={logo} alt="" height="60px" className={classes.image} />
            <h1><Link to="/" className={classes.title}>eLibrary</Link></h1>
          <div className={classes.grow} />
          {location.pathname === "/library" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={cart ? cart.total_items : 0} color="secondary">
                  <ShoppingBasket />
                </Badge>
              </IconButton>
              <IconButton
                component={Link}
                to="/borrowed"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={borrowed && borrowed.length} color="secondary">
                  <Book />
                </Badge>
              </IconButton>
              
            </div>
          )}
          { user ? (<Link to="/profile" className={classes.email}>{user.email}</Link>) : <p className={classes.email} style={{color: '#f0f0f0'}}>dummy</p>}
          {" "}
          { user ? 
          (<Button color="secondary" variant="contained" onClick={handleSignOut} className={classes.btn}>
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
