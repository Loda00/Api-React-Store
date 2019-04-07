module.exports = {
  _config: {
    DATABASE: {
      host: "localhost",
      user: "postgres",
      database: "store",
      password: "sql",
      port: 5432,
    },
    PORT: {
      port: process.env.PORT = process.env.PORT || 3001,
    }
  }
}