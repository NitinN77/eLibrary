import React, { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { useStateValue } from "./StateProvider";
import { Products, Navbar, Cart, Login } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";

import { auth, db } from "./firebase";
import Borrowed from "./components/Borrowed/Borrowed";
import HomePage from "./components/HomePage/HomePage";
import Recommender from './components/Recommender/Recommender';
import './App.css'
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import { Dialog } from '@material-ui/core'

import { Alert } from '@material-ui/lab'

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

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [timeleft, setTimeleft] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    dispatch({ type: "SET_PRODUCTS", data: data });

  };

  const fetchCart = async () => {
    const { cart } = await commerce.cart.retrieve();
    dispatch({ type: "SET_CART", data: cart });
  };

  const fetchBorrowed = async () => {
    if (user) {
      const rdata = await db.collection("borrowed").doc(user.email).get();
      if(rdata.data()){
        dispatch({ type: "SET_BORROWED", data: rdata.data().borrowed });
      }
    }
  };

  const returnborrowed = () => {
    db
    .collection('borrowed')
    .doc(user.email)
    .set({
      borrowed: [],
    })
    alert("Books Returned")
  }

  const fetchtime = async () => {
    let rdata = await db.collection("userdata").doc(user.email).get();
    rdata = rdata.data().borrowedTime
    const diff = new Date(rdata)
    if(diff - new Date() <= 0) {
      returnborrowed()
      alert('Your borrow time has ended and the books were returned')
    }
    else if(diff - new Date() <= 7.776e8){
      handleClickOpen()
      setTimeleft(timeDiffCalc(diff, new Date()).toString())
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", data: authUser });
      } else {
        dispatch({ type: "SET_USER", data: null });
      }
    });
    fetchBorrowed();
  }, [user]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts();
    fetchCart();
    if(user){
      fetchtime();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Router>
      <div className="maindivs">
        <Navbar />
        {open ?  
         <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
        >
        <Alert severity="warning">
          You have {timeleft} left to return your books
        </Alert>
       </Dialog>
        : null}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/library">
            <Products />
          </Route>
          <Route exact path="/recommend">
            <Recommender />
          </Route>
          <Route exact path="/news">
            <News />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/borrowed">
            <Borrowed />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
