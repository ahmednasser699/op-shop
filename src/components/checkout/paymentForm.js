import React from 'react'
import {Divider, Typography, Button} from '@material-ui/core'
import {Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from './review'

const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_KEY)
const PaymentForm = ({ token, data, back, handleCaptureCheckout, next }) => {
    
   const handleSubmit = async (e, elements, stripe) => {
       e.preventDefault()
       if (!elements || !stripe) return;

       const cardElement = elements.getElement(CardElement);
       const {error, paymentMethod}= await stripe.createPaymentMethod({type:"card", card:cardElement})
       if (error) {
            console.log(error)
       } else {
           const orderData = {
               line_items: token.live.line_items,
               customer: {
                   firstname: data.firstname,
                   lastname: data.lastname,
                   email:data.email
               },
               shipping: {
                   name: "primary",
                   street: data.address,
                   town_city: data.city,
                   county_state: data.division,
                   country: data.country,
                   postal_zip_code:data.zip
               },
               fulfillment: { shipping_method: data.option },
               payment: {
                   gateway: 'stripe',
                   stripe: {
                       payment_method_id: paymentMethod.id

                   }
               }
           }
        

           handleCaptureCheckout(token.id, orderData)
           next()
        }
        
    }

    return (
        <>
            <Review token={token} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>Payment Methods</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e)=>handleSubmit(e,elements,stripe)} >
                            <CardElement />
                            <br/> <br/>
                            <div style={{display:'flex', justifyContent:"space-between"}}>
                                <Button variant="outlined" onClick={back}>Back</Button>
                                <Button variant="contained" color="primary" type="submit" disabled={!stripe}>
                                   Pay {token.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>

            </Elements>
        </>
    )
}

export default PaymentForm
