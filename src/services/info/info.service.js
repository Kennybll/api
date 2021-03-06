// Initializes the `users` service on path `/users`
const hooks = require('./info.hooks');
const createService = require('./info.class');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/info', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('info');

  service.hooks(hooks);
};
