/* eslint-disable */
module.exports = function (app) {
  app.use('/', require('./home'));
  app.use('/list', require('./list'));
  app.use('/image', require('./image'));
  app.use('/todo-mvc', require('./todoMvc'));
};
