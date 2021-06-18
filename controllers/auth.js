import crypto from 'crypto';
import cookie from 'cookie';
import User from '../models/user.js';
import Wishlist from '../models/wishlist.js';


export const signup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User();
  try{
    const u = await User.findOne({ username });
    if (u) return res.status(409).end(`username ${username} already exists`);
    
    const e = await User.findOne({ email });
    if (e) return res.status(409).end(`email ${email} already exists`);
    
    const salt = generateSalt();
    user.username = username;
    user.email = email;
    user.salt = salt;
    user.hash = generateHash(password, salt);

    user.save((err, user) => {
      if (err) res.status(500).end(err);
      else res.json({user});
    });

  }catch(err){
    return res.status(500).end(err);
  }
}


export const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try{
    const user = await User.findOne({username});

    if (!user) return res.status(401).end(`username ${username} does not exist`);
    if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("invalid password");
    
    req.session.username = user.username;
    res.setHeader('Set-Cookie', cookie.serialize('username', user.username, {
      path : '/', 
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));

    return res.json(`username ${username} signed in`);

  }catch(err){
    return res.status(500).end(err);
  }

}

export const signout = (req, res) => {
  console.log('signout');
  req.session.destroy();
  res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
  }));
  res.send('signed out');
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({username: req.session.username});
    return res.json(user);
  }catch(err){
    return res.status(500).end(err);
  }
}

const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64');
}

const generateHash = (password, salt) => {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('base64');
}
