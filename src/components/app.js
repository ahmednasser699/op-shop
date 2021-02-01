import React, {useState, useEffect} from 'react'
import Products from './products'
import Navbar from './navbar/navbar'
import { commerce } from '../lib/commerce'
import Cart from './cart/cart'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import useStyle from './styles'
import Checkout from './checkout/checkout'



function App() {
    const [products, setProducts] = useState([])
    const [cart, setcart] = useState([])
    const [orderlist, setOrderlist] = useState({})
    const [errormsg, setErrormsg] = useState('')
    
    const classes= useStyle()
    
    const getPros = async() => {
        const { data } = await commerce.products.list()
        setProducts(data)
        
    }
    const fetchcart = async() => {
       setcart(await commerce.cart.retrieve())
    }
    const addToCart = async(proId, quantity) => {
        const item =await commerce.cart.add(proId, quantity)
        setcart(item.cart)
    }
    const cursorChange = (updated) => {
         
        let arr = document.querySelectorAll(".chbtn");
        console.log(arr)
        updated?document.body.style.cursor='default':document.body.style.cursor='wait'
        arr.forEach(item => {
           updated? item.classList.remove(classes.cursor):item.classList.add(classes.cursor)
        })
        // setTimeout(() => {
        //     document.body.style.cursor = 'default'
        //     console.log('1')
        // }, 1000);
        // document.body.style.cursor = 'progress'
        // console.log('2')
    }
    const onUpdate = async (productId, quantity) => {
      
        cursorChange(false)
        const { cart } = await commerce.cart.update(productId, { quantity })
        setcart(cart)
        
        cursorChange(true)
    }
    const onRemove = async(productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setcart(cart)
    }
    
    const emptyCart = async () => {
        
        const { cart } = await commerce.cart.empty()
        setcart(cart)
    }
    const refreshCart = async() => {
        const newcart = await commerce.cart.refresh()
        setcart(newcart)
    }
    const handleCaptureCheckout = async (tokenId, order) => {
        try {
           const neworder = await commerce.checkout.capture(tokenId, order)
            setOrderlist(neworder)
            refreshCart()
            console.log(neworder)
            
        } catch (error) {
            setErrormsg(error.data.error.message)
            console.log(error)
        }
      
    }

    useEffect(() => {
        getPros() 
        fetchcart()
    }, [])
    
    return (
        <BrowserRouter>
            <Navbar totalitems={cart.total_items} />
           
            <Switch>
                <Route exact path='/'>
                    <Products products={products} addToCart={addToCart} />
                </Route>
                <Route exact path='/cart'>
                    <Cart cart={cart}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                            emptyCart={emptyCart} />
                </Route>
                <Route exact path='/checkout'>
                    <Checkout cart={cart}
                    handleCaptureCheckout={handleCaptureCheckout}
                    order={orderlist}
                    error={errormsg}    
                    />
                </Route>
            </Switch>
            
        </BrowserRouter>
    )
}

export default App
