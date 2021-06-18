import mongoose from 'mongoose';
import config from 'config';

const boot = () => {
  const mongoURI = process.env.MONGODB_URI || config.get('mongoURI');
  console.log('mongodb URI: ', mongoURI);
  mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => { console.log('mongodb is ready')});

}


export default boot;
