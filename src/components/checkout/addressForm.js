import React,{useState, useEffect} from 'react'
import { Grid, Typography, Button, InputLabel, Select, MenuItem } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import InputForm from './InputForm'
import { commerce } from '../../lib/commerce'
import {Link} from 'react-router-dom'


const AddressForm = ({token, next}) => {
    const methods = useForm();
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [divisions, setDivisions] = useState([])
    const [division, setDivision] = useState('')
    const [options, setOptions] = useState([])
    const [option, setOption] = useState('')

const countriesArray = Object.entries(countries).map(([code, value])=>({id:code, label:value}))
const divisionsArray = Object.entries(divisions).map(([code, value]) => ({ id: code, label: value }))
const optinsArray = options.map((op)=>({id: op.id, label: `${op.description} - ${op.price.formatted_with_symbol}`}))    
    
    const fetchCountries = async(tokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(tokenId)
       
        setCountries(countries)
        setCountry(Object.keys(countries)[0])
       
    }
    const fetchDivisions = async(countrycode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countrycode)
        setDivisions(subdivisions)
        setDivision(Object.keys(subdivisions)[0])
        
    }
    const fetchOptions = async(tokenId, country, division=null) => {
        const response = await commerce.checkout.getShippingOptions(tokenId, { country, division })
        setOptions(response)
        setOption(response[0].id)
        
    }
   
    useEffect(() => {
        fetchCountries(token.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])
    useEffect(() => {
        (country && fetchDivisions(country))
        
    }, [country])
    useEffect(() => {
       (division && fetchOptions(token.id, country, division)) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[division])

    return (
        <>
            <Typography variant='h6' gutterBottom>Address Form</Typography>  
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({...data, country, division, option}))}>
                    <Grid container spacing={3}>
                        <InputForm name='firstname' label='First Name' />
                        <InputForm name='lastname' label='Last Name' />
                        <InputForm name='email' label='E-mail' />
                        <InputForm name='address' label='Address' />
                        <InputForm name='city' label='City' />
                        <InputForm name='zip' label='ZIP Code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Countries</InputLabel>
                            <Select fullWidth value={country} onChange={(e) => setCountry(e.target.value)} >
                                {countriesArray.map(country => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                               )) }
                              
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Divisions</InputLabel>
                            <Select fullWidth value={division} onChange={(e) => setDivision(e.target.value)} >
                                {divisionsArray.map((subdiv) => (
                                     <MenuItem key={subdiv.id} value={subdiv.id}>
                                    {subdiv.label}
                                    </MenuItem>
                                ))}
                               
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select fullWidth value={option} onChange={(e) => setOption(e.target.value)} >
                                {optinsArray.map((op) => (
                                    <MenuItem key={ op.id} value={op.id }>
                                       {op.label}
                                    </MenuItem>
                                ))}
                               
                            </Select>
                        </Grid>
                    </Grid>
                     <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="outlined" component={Link} to="/cart">Back To Cart</Button>
                            <Button variant='contained' type="submit" color="primary">Next</Button>
                        </div>
                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
