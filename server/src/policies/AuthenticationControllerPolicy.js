const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{4,16}$')
      )
    }

    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      console.log(value)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Ange en riktig epostadress din tokboll!'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Lösenordet måste innehålla minst 4 tecken och får vara maximalt 16 tecken långt.
              <br>
              Gödkända tecken är bokstäver och siffror ;)
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Fel registreringsapor. Försök igen'
          })
      }
    } else {
      next()
    }
  }
}
