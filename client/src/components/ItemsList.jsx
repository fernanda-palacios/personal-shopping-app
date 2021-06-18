import withAuth from '../hoc/withAuth'
import { Typography, IconButton, Box, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { makeStyles } from "@material-ui/core/styles";



const ItemsList = ({ items, onDeleteItem }) => {
    const classes = useStyles();

    return (
        <Grid container justify="center">


            {items.map((item, index) => (
                <>
                <Grid item container xs={10} justify="center" alignItems="center" className={classes.itemContainer}>
                    <Grid item xs={2}></Grid>
                    {/* <Grid item xs={1}>
                        <RadioButtonUncheckedIcon style={{ color: 'grey' }} />
                    </Grid> */}
                    <Grid xs={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', }}>

                            <Typography style={{ fontWeight: 'bold', marginBottom: '5px', marginRight: '100px' }}>
                                {item.name}
                            </Typography>
                            <Typography style={{ marginBottom: '0px' }}>
                                Price: ${item.price}
                        </Typography>
                            <Box style={{ display: 'flex', alignItems: "center" }}>
                                <Typography>
                                    {'URL: '}
                                </Typography>
                                <IconButton
                                    onClick={() => window.open(item.url, "_blank")}
                                    color="grey">
                                    <LaunchIcon
                                        fontSize="small"
                                    />
                                </IconButton>
                                <Typography style={{ width: "350px" }} variant="caption" noWrap>{item.url}</Typography>

                            </Box>
                        </div>
                    </Grid>
                    <Grid xs={2}>
                        <IconButton color="grey" onClick={() => onDeleteItem(item._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={7}><hr color="#C4C4C4" style={{border:"none", height:"1px"}}></hr></Grid>
                </>
            ))}

        </Grid>
    );

}


const useStyles = makeStyles((theme) => ({
    itemContainer: {
        marginTop: "20px"
    }
}));

export default withAuth(ItemsList);