import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import useSignup from '../hooks/auth/useSignup';
import useSignin from '../hooks/auth/useSignin';
import ErrorMessage from '../components/error/ErrorMessage';
import { useAuthUserContext } from '../contexts/AuthUser';



const SignupForm = () => {
  const classes = useStyles();
  // const queryClient = useQueryClient();
  const mutation = useSignup();
  const signinMutation = useSignin();
  const { username, setUsername } = useAuthUserContext();


  // const mutation = useMutation(d => axios.post('/auth/signup', d));

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(5, 'Username should be of minimum 5 characters length')
      .max(10, 'Username should be of Maximum 20 characters length')
      .required('Username is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .max(30, 'Password should be of Maximum 30 characters length')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      )
      .required('Password is required'),
  });

  const formik = useFormik({
     initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      mutation.mutate(values, {
        // signin directly
        onSuccess: (_values, variables) => {
          signinMutation.mutate(variables, {
            onSuccess: () => {
              setUsername(Cookies.get('username'));
              console.log('username saved:', username);
            }
          });
        }
      });
    }
  });
  if (signinMutation.isSuccess) return <Redirect to={`/questionnaire/${username}`}/>
  // if (!signinMutation.isSuccess && mutation.isSuccess) return <Redirect to='/'/>
  // if (mutation.isError) console.log('error is: ', mutation.error.message);

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
      {mutation.isError && <ErrorMessage occur={mutation.isError}>
        <div> {mutation.error.response.data} </div>
      </ErrorMessage>}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            name="email"
            autoComplete="email"
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
        color="secondary"
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Link to="/" variant="body2" textdecor>
        {"Already have an account? Sign in"}
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

export default SignupForm