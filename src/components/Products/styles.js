import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  searchbar: {
    width: '98.7%',
  },
  filtersection: {
    width: '100%',
    height: '700px',
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));