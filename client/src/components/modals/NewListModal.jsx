import React from 'react';
import { Container, Typography, Button, Grid, TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';


const NewListModal = ({ open, onClose, createNewList }) => {
    const classes = useStyles();


    const formik = useFormik({
        initialValues: {
            title: '',
        },

        onSubmit: (values) =>{
            createNewList(values)
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
                                Create new list
                        </Typography>
                        </Grid>
               
                        <Grid item xs={12}>
                            <TextField
                                label="List title"
                                placeholder="title"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="title"
                                type="text"
                                id="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} justify="flex-end" style={{ marginTop: '50px' }}>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={onClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" type="submit">Confirm</Button>
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

export default NewListModal