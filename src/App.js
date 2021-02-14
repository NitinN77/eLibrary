import React, { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { useStateValue } from "./StateProvider";
import { Products, Navbar, Cart, Checkout, Login } from "./components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import { auth } from './firebase';

function App() {
  const [,dispatch] = useStateValue();
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    dispatch({type: 'SET_PRODUCTS', data: data});
  };

  const fetchCart = async () => {
    const { cart } = await commerce.cart.retrieve();
    dispatch({type: 'SET_CART', data: cart});
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    dispatch({type: 'SET_CART', data: newCart});
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS', authUser);
      if (authUser) {
        dispatch({ type: 'SET_USER', data: authUser});
      }
      else {
        dispatch({ type: 'SET_USER', data: null});
      }
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout order={order} onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}/>
          </Route>
          <Route exact path="/login">
            <Login />
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
