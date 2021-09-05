import React from 'react';
import logo from './donavi-logo.png';
import {  makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ListsDashboardPage from './pages/ListsDashboardPage';
import ListPage from './pages/ListPage';
import { AuthUserProvider } from './contexts/AuthUser';
import Questionnaire from './pages/Questionnaire';

export default function App() {
  const classes = useStyles();

  return (
      <Router>
        <AuthUserProvider>
       
            <Link to='/'>
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
          
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
            <Route path='/profile/:username'>
              <ListsDashboardPage />
            </Route>
            <Route path='/list/:username/:listId'>
              <ListPage />
            </Route>
            <Route exact path='/questionnaire/:id'>
              <Questionnaire />
            </Route>
          </Switch>
        </AuthUserProvider>
      </Router>
    
  );
}


const useStyles = makeStyles((theme) => ({
  
  background: {
    backgroundColor: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  logo: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    margin: 'auto',
    maxWidth: '8%',
    maxHeight: '8%',
  }
}));