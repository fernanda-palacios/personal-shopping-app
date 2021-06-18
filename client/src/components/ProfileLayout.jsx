import { useState } from 'react';
import { Button, makeStyles, Typography, Paper } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import useSignout from '../hooks/auth/useSignout';
import { Redirect } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';



const ProfileLayout = ({ children, username }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };


  return ( 
  <>
  <ClickAwayListener onClickAway={handleClickAway}>
    <div className={classes.root}>
      <Button className={classes.btn} onClick={handleClick}>
        <Typography style={{textTransform:'capitalize'}}> {username} </Typography>
        <ArrowDropDownIcon/>
      </Button>
      {open ? (
          <Options />
      ) : null}
    </div>
  
  </ClickAwayListener>

  { children }
  </>
  );
}

const Options = () => {
  const classes = useStyles();
  const mutation = useSignout();

  const handleLogout = () => {
    mutation.mutate();
  }

  if (mutation.isSuccess) return <Redirect to={`/`}></Redirect>

  return ( 
    <Paper className={classes.opt}>
      <MenuList>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Paper>
  );
}
 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  btn: {
    top: theme.spacing(3),
    right: theme.spacing(5),
    border: '1px solid',
  },
  opt: {
    position: 'absolute',
    top: theme.spacing(9),
    right: theme.spacing(3),
    border: '1px solid',
    padding: theme.spacing(1),
    maxWidth: '8%',
  }
}));
 
export default ProfileLayout;