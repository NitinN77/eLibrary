import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { commerce } from "../../../lib/commerce";
import { useStateValue } from "../../../StateProvider";

function Product({ product }) {
    const classes = useStyles();
    const [,dispatch] = useStateValue();
    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        dispatch({type: 'SET_CART', data: cart});
    };
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>

            <div className={classes.cardContent1}>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    {/* {product.categories.map((cat)=>(
                    <Typography variant="h5" gutterBottom>{cat.name}</Typography>
                    ))} */}
                </div>
                <Typography dangerouslySetInnerHTML = {{__html: product.description}} variant="body2" color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Card" onClick={() => handleAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
            </div>
            
        </Card>
    );
}

export default Product;
