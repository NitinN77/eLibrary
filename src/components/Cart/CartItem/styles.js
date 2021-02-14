import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 260,
  },
  root: {
    height: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  cartActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '20px',
  },
  rembtn: {
    marginRight: '10px',
  }
}));