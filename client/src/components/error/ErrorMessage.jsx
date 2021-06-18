import React from 'react';
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const ErrorMessage = ({ children, occur }) => {
    return (
        <Collapse in={occur}>
            <Alert action={
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
            >
            </IconButton>
            } severity="error">
                {children}
            </Alert>
        </Collapse>
    );
};

export default ErrorMessage;