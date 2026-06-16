module.exports.requireAuth = function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.session.error = "Please sign in to continue.";
  res.redirect("/auth/login");
};
