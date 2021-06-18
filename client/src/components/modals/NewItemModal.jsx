import React from 'react';
import { Container, Typography, Button, Grid, TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';


const NewItemModal = ({ open, onClose, addNewItem }) => {
    const classes = useStyles();


    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            url: '',
        },

        onSubmit: (values) =>{
            addNewItem(values)
            formik.resetForm()
        }

    })

    return (
        <Modal open={open} onClose={onClose}>
            <Container maxWidth="sm" className={classes.modalContainer} >
                <form className={classes.form} onSubmit={formik.handleSubmit}>

                    <Grid container spacing={1}>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                            <Typography variant="h2">
                                Add new item to list
                        </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Item title"
                                placeholder="Product Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="name"
                                type="text"
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />


                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Price"
                                placeholder="0.00"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                name="price"
                                type="text"
                                id="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Product URL"
                                placeholder="URL address"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="url"
                                type="url"
                                id="url"
                                value={formik.values.url}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} justify="flex-end" style={{ marginTop: '50px' }}>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={onClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" type="submit">Add Item</Button>
                        </Grid>

                    </Grid>
                </form>
            </Container>

        </Modal >
    );
}

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(3)
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: '40px', marginTop: '100px'
    }

}));

export default NewItemModal