//= ================================================

/**
 * Define an API
 * @param {*} app
 */
const apiFoxlog = (app) => {
  console.log('API');

  app.get('/', (req, res) => {
    res.send('API ready!');
  // console.log('Hello world');
  });
  app.get('/report/sarra', (req, res) => {
    res.send('Hello').status(200);
  // console.log('report');
  });
  app.get('/toto', (req, res) => {
    res.send('report').status(300);
  // console.log('report');
  });
  app.get('/report/gregory', (req, res) => {
    res.send('report').status(400);
  // console.log('report');
  });

  app.get('/api/user', (req, res) => {
    res.send('api get');
  });
  app.post('/api/user', (req, res) => {
    res.send('api post');
  });
  return app;
};

// export
exports.apiFoxlog = apiFoxlog;
