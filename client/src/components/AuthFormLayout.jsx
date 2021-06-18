import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Typography } from '@material-ui/core';

const AuthFormLayout = ( { children, title } ) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2">
          {title}
        </Typography>
        {children}
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default AuthFormLayout