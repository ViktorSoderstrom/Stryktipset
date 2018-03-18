const request = require('request')
const config = require('../config/config')
const {Tips} = require('../models')
module.exports = {
  async getTips (req, res) {
    await request.get(config.stryktipset.url + config.stryktipset.token,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body)
        }
      })
  },
  async tippa (req, res) {
    var options = {
      uri: 'https://api.www.svenskaspel.se/external/wager/ownwager/stryktipset?accesskey=4d37faeb-a1b7-4a82-adb9-0b7c948dada5',
      method: 'POST',
      json: {
        drawNumber: 0,
        system: 'single',
        items: req.body,
        client: 'Virres strykis',
        retailer: 'Virre'
      }
    }
    console.log(options)
    await request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body)
      } else {
        res.send(error)
      }
    })
  },
  async saveBong (req, res) {
    try {
      var tips = await Tips.create(req.body)
      res.send(tips.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Något gick fel vid skrivningen till databasen'
      })
    }
  }
}
