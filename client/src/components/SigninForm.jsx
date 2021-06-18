import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import useSignin from '../hooks/auth/useSignin';
import { useAuthUserContext } from '../contexts/AuthUser';
import ErrorMessage from '../components/error/ErrorMessage';

const SigninForm = () => {
  const classes = useStyles();
  const mutation = useSignin();
  const { username, setUsername } = useAuthUserContext();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  const formik = useFormik({
     initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      mutation.mutate(values, {
        onSuccess: () => {
          setUsername(Cookies.get('username'));
        }
      });
    }
  })


  if (mutation.isSuccess) return <Redirect to={`/profile/${username}`}></Redirect>

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
      <ErrorMessage occur={mutation.isError}>
        Invalid username or password
      </ErrorMessage>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
      <Link to="/signup" variant="body2">
        {"Not a member? Sign up"}
      </Link>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SigninForm;