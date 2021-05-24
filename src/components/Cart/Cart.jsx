import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { commerce } from "../../lib/commerce";
import { db } from '../../firebase'
import { useHistory } from 'react-router-dom';


function Cart() {
  const [{ cart, user }, dispatch ] = useStateValue();
  const classes = useStyles();
  let history = useHistory();
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    dispatch({type: 'SET_CART', data: cart});
  };

  const handlesubmit = async () => {
    db
    .collection('borrowed')
    .doc(user.email)
    .set({
        borrowed: cart.line_items,
    })

    let rdata = await db.collection("bhistory").doc(user.email).get();
    rdata = rdata.data().history
    cart.line_items.map(book => rdata.push(book))

    db.collection('bhistory')
    .doc(user.email)
    .set({
        history: rdata,
    })

    var bDate = new Date();
    bDate.setDate(bDate.getDate() + 10); 


    db.collection('userdata')
    .doc(user.email)
    .set({
      borrowedTime: bDate.getTime(),
    })

    history.push('/library')
    handleEmptyCart()
  }

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      No items in cart
      <Link to="/" className={classes.link}>
        Store
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Clear Basket
          </Button>
          <Button
            component={Link}
            onClick={()=>handlesubmit()}
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="Primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart) {
    return(<div></div>)
  }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Basket
      </Typography>
      {!cart.line_items ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
