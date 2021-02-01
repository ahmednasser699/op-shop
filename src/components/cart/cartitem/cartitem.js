import React from 'react'
import {Typography, Button, Card, CardActions, CardMedia, CardContent} from '@material-ui/core'
import useStyles from './styles'
import {Add, Remove } from '@material-ui/icons'

const CartItem = ({ item, onUpdate, onRemove }) => {
    const classes = useStyles();
    

   
    return (
        <Card>
            <CardMedia image={item.media.source} className={classes.media} /> 
            <CardContent className={classes.cardContent}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">{ item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button className='chbtn' type="button" size="small" onClick={()=>onUpdate(item.id, item.quantity-1)}><Remove /></Button>
                    <Typography variant='inherit'>{ item.quantity}</Typography>
                     <Button className='chbtn' type="button" size="small" onClick={()=>onUpdate(item.id, item.quantity+1)} ><Add /></Button>
                </div>
                 <Button type="button" color="secondary" variant="contained" onClick={()=>onRemove(item.id)}>Remove</Button>
            </CardActions>
           
            
        </Card>
    )
}

export default CartItem
