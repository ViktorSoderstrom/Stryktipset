const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const StryktipsetController = require('./controllers/StryktipsetController')

module.exports = (app) => {
  console.log('in register!')
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  app.post('/getTips',
    StryktipsetController.getTips)
  app.post('/tippa',
    StryktipsetController.tippa)
  app.post('/saveBong',
    StryktipsetController.saveBong)
  app.post('/getResults',
    StryktipsetController.getResults)
  app.post('/getBongFromDrawId',
    StryktipsetController.getBongFromDrawId)
  app.post('/getDraw',
    StryktipsetController.getDraw)
  app.post('/getResult',
    StryktipsetController.getResult)
}
