import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { commerce } from "../../../lib/commerce";
import { useStateValue } from "../../../StateProvider";
import Chip from '@material-ui/core/Chip';

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
                </div>
                {product.categories.map(cat => <Chip color="secondary" key={cat.id} label={cat.name} style={{marginRight: "10px", marginBottom: '12px'}}/>)}
                <br />
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
