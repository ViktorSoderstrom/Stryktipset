const bcrypt = require('bcrypt-nodejs')

function hashPassword (user) {
  if (!user.changed('password')) {
    return
  }
  var hash = bcrypt.hashSync(user.password)
  console.log(hash)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
