import React,{useState, useEffect} from 'react'
import { Paper, Stepper, Typography, Button, Step, StepLabel, Divider, CircularProgress, CssBaseline } from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'
import AddressForm from './addressForm'
import PaymentForm from './paymentForm'
import {commerce} from '../../lib/commerce'
import useStyles from './styles'

const Checkout = ({cart, handleCaptureCheckout, error, order}) => {
    const classes = useStyles()
    const [activeStep, setActivestep] = useState(0)
    const [token, setToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const steps = ['shipping address', 'payment details']
    const history = useHistory();
    
    const getToken = async () => {
        
        const response = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
       
        setToken(response)
    }

    useEffect(() => {
        try {
             getToken()
        } catch (error) {
            history.push('/')
        }
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const nextStep = () => setActivestep((previosStep) => previosStep + 1)
     const prevStep=()=> setActivestep((previosStep)=> previosStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
        
    }
    const Form = () => (
        activeStep === 0 ?
            <AddressForm token={ token } next={next} />
            : <PaymentForm data={shippingData} token={ token} back={prevStep} handleCaptureCheckout={handleCaptureCheckout} next={nextStep} />
    )
    const Confirmation = () => order.customer?(
        <>
            <Typography variant="h6">Thank You For Your Purchase {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider />
            <Typography variant="subtitle1">Order Ref: {order.customer_reference}</Typography>
            <br />
            <Button variant="outlined" component={Link} to="/">Back To Home</Button>
        </>
    ) : (
            <div className={classes.spinner}>
            <CircularProgress/>
            </div>
        )
    if (error) {
        <>
            <Typography variant="h6">Error: {error}</Typography>
            <br />
            <Button variant="outlined" component={Link} to="/">Back To Home</Button>
            
        </>
    }
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}></div>
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center" >
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper} >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{ step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep>=steps.length?<Confirmation/>:token && <Form/>}
                </Paper>

            </div>
        </>
    )
}

export default Checkout
