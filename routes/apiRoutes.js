const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/examples', AppController.getExamples);
  router.post('/examples', AppController.createExample);
  router.delete('/examples/:id', AppController.deleteExample);

  // trees
  router.get('/treesadam', AppController.getTreesForAdam);
  router.get('/trees', AppController.getTree);
  router.post('/trees', AppController.createTree);
  router.delete('/trees/:id', AppController.deleteTree);

  router.post('/uploadfile', AppController.getExcelFile);
  router.post('/downloads', AppController.getTrees);

  return router;
};
