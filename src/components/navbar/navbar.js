import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import useStyles from './style'
import logo from '../../images/shoppic.png'
import { Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom'

const Navbar = ({totalitems}) => {
    const classes = useStyles();
    const location = useLocation();

   
    return (
        <AppBar position='fixed'>
            <Toolbar className={classes.appBar}>
                <Typography component={Link} to="/" onClick={()=>window.scrollTo(0,0)} variant="h6" color="inherit" className={classes.title}>
                    <img src={logo} className={classes.image} height="45px" width="55px" alt="logo" />
                   Op-Shop
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button}>
                    {location.pathname === '/' && (
                         <IconButton component={Link} to="/cart" onClick={()=>window.scrollTo(0,0)} aria-label='show items' title="show items" color="inherit">
                 <Badge badgeContent={totalitems} color="secondary">
                    <ShoppingCart />
                 </Badge>
                    </IconButton>
                    )}
               
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
