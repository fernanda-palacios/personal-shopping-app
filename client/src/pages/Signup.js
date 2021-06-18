import React from 'react';
import { Grid } from '@material-ui/core';
import AuthFormLayout from '../components/AuthFormLayout';
import SignupForm from '../components/SignupForm';


const Signup = () => {

  return (
    <Grid container>
      <Grid xs={12}>
        <AuthFormLayout title={'Sign up'}>
          <SignupForm/>
        </AuthFormLayout>
      </Grid>
    </Grid>
   );
}


export default Signup;