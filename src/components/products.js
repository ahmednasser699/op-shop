import React from 'react'
import { Grid } from '@material-ui/core'
import Item from './product/item'
import useStyles from './styles'

const Products = ({products, addToCart}) => {
    const classes = useStyles();
    
    return (
        <div className={classes.content}>
            <div className={ classes.toolbar}/>
            <Grid container justify='center' spacing={3} >
                {products.map(pro => {
                    return (
                        <Grid item key={pro.id} xs={12} sm={6} md={4} lg={3}>
                            <Item product={ pro} addToCart={addToCart} />
                        </Grid>
                    )
                })}  
            </Grid>
        </div>
    )
}

export default Products
