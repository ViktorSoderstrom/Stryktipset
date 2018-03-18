const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const StryktipsetController = require('./controllers/StryktipsetController')

module.exports = (app) => {
  console.log('in register!')
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/getTips',
    StryktipsetController.getTips)
  app.post('/tippa',
    StryktipsetController.tippa)
  app.post('/saveBong',
    StryktipsetController.saveBong)
}
