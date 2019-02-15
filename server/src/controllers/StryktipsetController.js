/* eslint-disable */

const request = require('request')
const config = require('../config/config')
const {Tips} = require('../models')
module.exports = {
  async getTips (req, res) {
    await request.get(config.stryktipset.drawsUrl + config.stryktipset.token,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body)
        }
      })
  },
  async getResult (req, res) {
    await request.get(config.stryktipset.drawsUrl + req.body.drawNumber + '/result' + config.stryktipset.token, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        res.send(body)
      } else {
        res.send(error)
      }
    })
  },
  async getDraw (req, res) {
    await request.get(config.stryktipset.drawsUrl + req.body.drawNumber + config.stryktipset.token, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        res.send(body)
      } else {
        res.send(error)
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
  async getResults (req, res) {
    await request.get(config.stryktipset.resultUrl + config.stryktipset.token,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body)
        } else {
          res.status(400).send({
            error: 'Något gick fel när resultat skulle hämtas'
          })
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
  },
  async getBongFromDrawId (req, res) {
    console.log(req.body.nr)
    var tips = await Tips.findOne({
      where: {drawNumber: req.body.nr}
    })
    if (tips) {
      res.send(tips.toJSON())
    } else {
      res.send({
        error: 'ingen bong hittades'
      })
    }
  }
}
