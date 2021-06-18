import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import AuthFormLayout from '../components/AuthFormLayout';
import SigninForm from '../components/SigninForm';


const Home = () => {

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid xs={12} md={8}>
        <AuthFormLayout title={'Sign in'}>
          <SigninForm/>
        </AuthFormLayout>
      </Grid>
      <Grid xs={false} md={4} className={classes.background}></Grid>
  </Grid>
   );
}

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  root: {
    height: '100vh',
  },
}));
 
export default Home;