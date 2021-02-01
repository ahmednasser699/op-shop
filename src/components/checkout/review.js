import React from 'react'
import {List, ListItem, Typography, ListItemText} from '@material-ui/core'

const Review = ({token}) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order Review
            </Typography>
            <List disablePadding>
                {token.live.line_items.map(product => (
                    <ListItem key={product.name} style={{padding:'10px 0', position:"relative"}}>
                        <ListItemText primary={product.name} secondary={`quantity: ${product.quantity}`} />
                        <img src={ product.media.source} alt='img' height='60' width="60" style={{position:"absolute", left:"25%"}} />
                        <Typography variant='h6'>{ product.price.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0', display:"block" }} >
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{fontWeight:'700'}}>
                        {token.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List> 
        </>
    )
}

export default Review
