const isAuthenticated = function(req, res, next) {
  if (!req.session.username) return res.status(401).end("access denied");
  next();
};

export default isAuthenticated;