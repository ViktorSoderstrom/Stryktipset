const request = require('request')

module.exports = {
  async getTips (req, res) {
    request.get('https://api.www.svenskaspel.se/external/draw/stryktipset/draws?accesskey=4d37faeb-a1b7-4a82-adb9-0b7c948dada5',
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body)
        }
      })
  }
}
