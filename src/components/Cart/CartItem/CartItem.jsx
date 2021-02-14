import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import { useStateValue } from "../../../StateProvider";
import { commerce } from "../../../lib/commerce";

function CartItem({ item }) {
  const [,dispatch] = useStateValue();
  const classes = useStyles();
  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    dispatch({ type: "SET_CART", data: cart });
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    dispatch({ type: "SET_CART", data: cart });
  };
  return (
    <Card className={classes.root}>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <div className={classes.content}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4">{item.name}</Typography>
          <Typography variant="h5">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActionArea className={classes.cartActions}>
          <div className={classes.buttons}>
            <Button
              type="button"
              size="small"
              onClick={() =>
                handleUpdateCartQuantity(item.id, item.quantity - 1)
              }
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() =>
                handleUpdateCartQuantity(item.id, item.quantity + 1)
              }
            >
              +
            </Button>
          </div>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            className={classes.rembtn}
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default CartItem;
