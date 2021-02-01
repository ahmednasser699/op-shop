import React from 'react'
import { Card, CardActions, IconButton, Typography, CardContent, CardMedia } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'

const Item = ({ product, addToCart }) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia image={product.media.source} title={product.name} className={ classes.media}/>
                <CardContent>
                    <div className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                    {product.name}
                    </Typography>
                    <Typography variant="h6">
                    {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{ __html:product.description }} variant="body2" color="textSecondary" />
                </CardContent>
                <CardActions disableSpacing className={classes.CardActions} >
                    <IconButton aria-label="add to chart" onClick={()=>addToCart(product.id, 1)}>
                        <AddShoppingCart />
                    </IconButton>
                
                </CardActions>
            </Card>
        </div>
    )
}

export default Item
