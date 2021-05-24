import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    bg: {
      marginTop: '81px',
    },
    topics: {
      padding: '50px',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    news:{
      margin: '10px'
    },
    root: {
      maxWidth: '100%',
      height: '200px',
      display: 'flex',
    },
    media: {
      display: 'flex',
      width: '300px',
      justifyContent: 'flex-start'
    },
    cardActions: {
      position: 'absolute'
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
    }
}));
