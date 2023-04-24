import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 50,
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1),
    width: '100px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: '#333333',
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    color: '#333333',
    '&:hover': {
      backgroundColor: '#BEBEBE',
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search documents"
        inputProps={{ 'aria-label': 'search documents' }}
      />
    </Paper>
  );
}
