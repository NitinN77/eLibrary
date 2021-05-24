import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  searchbar: {
    width: '98.7%',
    marginTop: '20px',
    boxShadow: '0px !important',
  },
  filtersection: {
    width: '100%',
    height: '580px',
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));