import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" className={classes.link}>Inicio</Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/userlist" className={classes.link}>Lista de Usuarios</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
