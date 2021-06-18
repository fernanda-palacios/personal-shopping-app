import { useState } from 'react';
import { Typography, Grid, IconButton, Box, CircularProgress } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NewItemModal from './modals/NewItemModal';
import { makeStyles } from "@material-ui/core/styles";
import ItemsList from '../components/ItemsList';
import { useQuery } from 'react-query'
import useAddWishlistItem from '../hooks/auth/useAddWishlistItem';
import useDeleteWishlistItem from '../hooks/auth/useDeleteWishlistItem';
import { useParams } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Redirect } from 'react-router-dom';



const Wishlist = () => {
  const classes = useStyles();

  const { username, listId } = useParams()

  const mutationAddItem = useAddWishlistItem();
  const mutationDeleteItem = useDeleteWishlistItem();

  const [open, setOpen] = useState(false);
  const [redirectToListsPage, setRedirectToListsPage] = useState(false);


  const addNewItem = (values) => {
    mutationAddItem.mutate({ values, listId }, {
      onSuccess: () => {
        refetch();
      }
    })
    handleClose()
  }

  const onDeleteItem = (item_id) => {
    mutationDeleteItem.mutate(item_id, {
      onSuccess: () => {
        refetch();
      }
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const { isLoading, error, data, refetch } = useQuery('items', async () => {

    const items = await fetch(`/api/wishlist/${listId}/items`).then((res) => res.json())
    const title = await fetch(`/api/wishlist/${listId}`).then((res) => res.json()).then((wishlist) => wishlist.title)
    return { items, title }

  })

  if (redirectToListsPage) return <Redirect to={`/profile/${username}`}></Redirect>


  if (isLoading) return (<Grid container justify="center">
    <Grid item>
      <CircularProgress></CircularProgress>
    </Grid>
  </Grid>)


  if (error) return (<Grid container justify="center">
    <Grid item>
      <Typography>An error has occurred: {error.message}</Typography>
    </Grid>
  </Grid>)

  return (
    <Box id="savedListMainContainer" className={classes.savedListMainContainer} >
      <Box>
        <Box width="1200px">
          <Grid container justify="center">
            <Grid item container xs={9} className={classes.titleContainer} onClick={handleOpen}>
              <Grid item xs={1}> </Grid>
              <Grid item xs={6}>

                <Box id="addToList" style={{ display: "flex", alignItems: "center", justifyContent: "left", marginLeft: "40px" }}>
                  <IconButton color="grey"
                    onClick={() => setRedirectToListsPage(true)}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Box item style={{ marginLeft: '200px' }}>
                    <Typography variant="h2">
                      {data.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>


          <Grid container justify="center">

            <Grid item container xs={7} className={classes.itemContainer} onClick={handleOpen}>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={6}>

                <Box id="addToList" style={{ display: "flex", alignItems: "center", justifyContent: "left", marginLeft: "40px" }}>
                  <AddBoxIcon color="primary" />
                  <Box item style={{ marginLeft: '12px' }}>
                    <Typography >
                      Add to List
                  </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={7}><hr color="#C4C4C4" style={{ border: "none", height: "1px", margin: "0px" }}></hr></Grid>

          </Grid>
        </Box>
        <NewItemModal
          open={open}
          onClose={handleClose}
          addNewItem={addNewItem}

        />
        <ItemsList items={data.items} onDeleteItem={onDeleteItem} />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  savedListMainContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(7)
  },
  itemContainer: {
    paddingBottom: '20px',
    paddingTop: '20px',
    marginBottom: '0px',
    '&:hover': {
      background: '#F6F6F6',
      cursor: 'pointer'
    }
  },
  titleContainer: {
    marginBottom: '20px',
  }
}));


export default Wishlist