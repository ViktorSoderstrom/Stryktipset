module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'stryktipset',
    user: process.env.DB_USER || 'stryktipset',
    password: process.env.DB_PASS || 'stryktipset',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './stryktipset.sqlite'
    }
  }
}
