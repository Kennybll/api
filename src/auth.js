const Strategy = require('passport-custom');

module.exports = opts => {
  return function() {
    const verifier = async (req, done) => {
      // create a new user in the user service
      // mark this user with a specific anonymous=true attribute
      let users = await this.service(opts.userService).find({
        username: req.body.username
      });
      users = users.data;

      if(users.length === 0) {
        const user = await this.service(opts.userService).create({
          username: req.body.username,
          accessToken: req.body.accessToken,
          user: req.body.user
        });
        return done(null, user, {
          username: user.username,
          user: user.user,
          accessToken: user.accessToken
        });
      } else {
        return done(null, users[0], {
          username: users[0].username
        });
      }
    };

    // register the strategy in the app.passport instance
    this.passport.use('auth', new Strategy(verifier));
  };
};