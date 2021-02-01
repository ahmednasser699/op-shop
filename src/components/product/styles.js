import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    root: {
        maxWidth:'100%'
    },
     media: {
       height: 280,
       
  },
  cardContent: {
    display: 'flex',
    alignItems:'baseline',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    }
}))