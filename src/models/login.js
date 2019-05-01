const { Pool } = require('pg')

const { _config } = require('../config/_config')

class Login {
  constructor() {
    this.instance = undefined
  }

  connection() {
    if (this.instance === undefined) {
      this.instance = new Pool(_config.DATABASE)
    }
  }

  async getToken(id_email) {

    this.connection()

    const cli = await this.instance.connect()

    let res
    const query = `select u.id_email, u.name, u.lastname, u.userid, u.photo, u.password, r.roll_description from usuario u inner join roll r ON
                    u.roll = r.id
                    where id_email = ${id_email}`

    try {
      res = await cli.query(query)
      await cli.query('COMMIT')
    } catch (error) {
      await cli.query('ROLLBACK')
      throw new Error(error)
    }

    return res
  }
}

module.exports = {
  Login
}