import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    bg: {
      backgroundColor: '#eb7734',
      marginTop: '81px',
    },
    root: {
      height: '300px',
      marginLeft: '100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    cardroot: {
      maxWidth: '100%',
      height: '300px',
      display: 'flex',
      marginBottom: '30px'
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
    topsection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
}));

