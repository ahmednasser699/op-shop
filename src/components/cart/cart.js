import React from 'react'
import { Container, Grid, Typography, Button } from "@material-ui/core";
import useStyle from './styles'
import CartItem from './cartitem/cartitem'
import {Link} from 'react-router-dom'

const Cart = ({ cart, onUpdate, onRemove, emptyCart }) => {
   
   
    const classes = useStyle();
   
    const emptycart = () => {
        return (
            <div>
                <Typography variant="subtitle2" >
                    your cart is empty! 
                     <Link className={classes.link} to="/"> add some products</Link>
                </Typography>
            </div>
        )
    }
    const itemscart = () => {
        return (
            <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs={12} sm={6} md={4} ld={3} key={item.id}>
                        <CartItem item={item} onUpdate={onUpdate} onRemove={onRemove} /> 
                   </Grid>   
                ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h5">subTotal: <span style={{color:'#3400b3', fontWeight:"bold"}}>{cart.subtotal.formatted_with_symbol}</span></Typography>
                    <div>
                    <Button type="button" className={classes.emptyButton} size="large" variant="contained" color="secondary" onClick={emptyCart}>empty cart</Button>
                        <Button component={Link} to='/checkout' type="button" className={classes.checkoutButton} size="large" variant="contained" color="primary">Checkout</Button>
                        </div>
                </div>
        </>
        )
    }
    if(!cart.line_items)return <div>loading...</div>
    return (
        <Container>
            <div className={classes.toolbar} /> 
            <Typography variant="h4" className={classes.title} gutterBottom>
                your shopping items
            </Typography>
           {!cart.line_items.length?emptycart():itemscart()}
        </Container>
    )
}

export default Cart
