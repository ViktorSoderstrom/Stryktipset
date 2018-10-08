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
    drawUrl: process.env.ST_DRAWURL || 'https://api.www.svenskaspel.se/external/draw/stryktipset/draws/',
    resultUrl: process.env.ST_RESULTURL || 'https://api.www.svenskaspel.se/external/draw/stryktipset/draws/result',
    token: process.env.ST_TOKEN || '?accesskey=4d37faeb-a1b7-4a82-adb9-0b7c948dada5'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
