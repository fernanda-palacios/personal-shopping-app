import { useParams } from 'react-router-dom';
import { makeStyles, Typography, Container } from '@material-ui/core';
import QuestionnaireForm from '../components/QuestionnaireForm';

const Questionnaire = () => {
  const classes = useStyles();
  const { id } = useParams();

  return ( 
    <Container maxWidth={'md'} className={classes.root}>
        <Typography variant='h2' xs={6}>
          Before you get started we need to ask you a few more questions...
        </Typography>
        <Typography variant='subtitle1'>
          These questions are to help make your shopping experience more personalized in the future
        </Typography>
        <div className={classes.form}>
          <QuestionnaireForm id={id}/>
        </div>
    </Container>
   );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(25),

  },
  form: {
    marginTop: theme.spacing(15)
  }
}));


 
export default Questionnaire;