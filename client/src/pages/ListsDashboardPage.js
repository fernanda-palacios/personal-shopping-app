import { useState } from 'react';
import { useParams } from 'react-router-dom';
import withAuth from '../hoc/withAuth'
import Wishlist from '../components/ShoppingList';
import ProfileLayout from '../components/ProfileLayout';
import { Button, Grid, Paper, Typography, IconButton, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useQuery } from 'react-query'
import { makeStyles } from '@material-ui/core/styles';
import NewListModal from '../components/modals/NewListModal';
import useCreateNewList from '../hooks/auth/useCreateNewList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import useDeleteList from '../hooks/auth/useDeleteList';





const ListsDashboardPage = () => {
  const classes = useStyles();

  const { username } = useParams();

  const [redirectToList, setRedirectToList] = useState(false);
  const [selectedListId, setSelectedListId] = useState(undefined);
  const [open, setOpen] = useState(false);

  const mutationCreateList = useCreateNewList();
  const mutationDeleteList = useDeleteList();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewList = (values) => {
    mutationCreateList.mutate(values, {
      onSuccess: () => {
        refetch();
      }
    })
    handleClose()
  }

  const onDeleteList = (listId) => {
    mutationDeleteList.mutate(listId, {
      onSuccess: () => {
        refetch();
      }
    })
  }

  const { isLoading, error, data, refetch } = useQuery('lists', async () => {
    return fetch(`/api/wishlists`).then((res) => res.json())
  })

  if (redirectToList) return <Redirect to={`/list/${username}/${selectedListId}`}></Redirect>

  if (isLoading) return (<Grid container justify="center" style={{ marginTop: "40px" }}>
    <Grid item>
      <CircularProgress></CircularProgress>
    </Grid>
  </Grid>)


  if (error) return (<Grid container justify="center" style={{ marginTop: "40px" }}>
    <Grid item>
      <Typography>An error has occurred: {error.message}</Typography>
    </Grid>
  </Grid>)

  return (
    <ProfileLayout username={username}>
      <Grid container style={{ marginTop: '15px', marginBottom: '10px' }} spacing={8} justify="center" alignItems="center">
        <Grid item >
          <Typography variant="h2">
            My Lists
        </Typography>
        </Grid>
        <Grid item >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            size="small"
            startIcon={<AddIcon />}
          >
            new list
      </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ width: "80%", margin: "auto" }}>
        {data.map((list) =>
          <Grid item xs={4} container direction="column">
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                onClick={() => {
                  setRedirectToList(true)
                  setSelectedListId(list._id)
                }}
                style={{ paddingTop: "40px", paddingBottom: "40px" }}
              >{list.title}
              </Paper>
            </Grid>
            <Grid item xs={12} container justify="center">
              <IconButton color="grey"
                onClick={() => onDeleteList(list._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <NewListModal
        open={open}
        onClose={handleClose}
        createNewList={createNewList}
      />

    </ProfileLayout>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontWeight: "bold",
    '&:hover': {
      cursor: 'pointer'
    }
  },
}));


export default withAuth(ListsDashboardPage);