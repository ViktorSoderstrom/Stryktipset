var db = require('./index')
var JsonField = require('sequelize-json')

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Tips', {
    user: DataTypes.STRING,
    drawNumber: DataTypes.INTEGER,
    bong: JsonField(db, 'Tips', 'bong')
  })
