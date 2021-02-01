import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {Grid, TextField} from '@material-ui/core'

const InputForm = ({name, label, required}) => {
    const {control} = useFormContext()
    return (
        <Grid item sx={12} sm={6}>
            <Controller
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required
                defaultValue=''
            />
        </Grid>
    )
}

export default InputForm
