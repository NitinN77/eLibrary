import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    height: '300px',
    display: 'flex',
  },
  media: {
    display: 'flex',
    width: '300px',
    justifyContent: 'flex-start'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',

  },
  cardContent1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '1200px',
  },
}));