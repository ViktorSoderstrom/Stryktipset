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
  },
  stryktipset: {
    token: process.env.STR_TOKEN || '4d37faeb-a1b7-4a82-adb9-0b7c948dada5'
  }
}
