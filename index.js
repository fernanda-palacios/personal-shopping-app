import express, { json } from 'express';
import path from 'path';
import http from 'http';
import config from 'config'
import router from './router.js';
import session from 'express-session'
import bootMongo from './services/dbservice.js';
// import cors from 'cors'

const app = express();

// const corsOptions = {
//   credentials: true,
// };
// app.use(cors(corsOptions));

// console.log("node_ENV: ", process.env.NODE_ENV);

app.use(session({
  secret: 'Donavi',
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}));

// Serve static files from the React app
const dirname = path.resolve();
app.use(express.static(path.join(dirname, 'client/build')));


app.use(json());

app.use(function (req, _res, next){
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});


// app.use(urlencoded({ extended: true}));


const PORT = process.env.PORT || config.get('port') || 5000;
console.log('PORT env: ', PORT);


bootMongo();

router(app);

http.createServer(app).listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`HTTP server listenining on port ${PORT}`)
})
