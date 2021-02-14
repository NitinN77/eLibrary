import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { commerce } from "../../lib/commerce";

function Cart() {
  const [{ cart }, dispatch ] = useStateValue();
  const classes = useStyles();

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    dispatch({type: 'SET_CART', data: cart});
  };

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
          Subtotal: {cart.subtotal.formatted_with_symbol}
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
            Clear Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
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
        Your Cart
      </Typography>
      {!cart.line_items ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
