const { Pool } = require('pg')

const { _config } = require('../config/_config')

class User {
  constructor() {
    this.instance = undefined
  }

  connection() {
    if (this.instance === undefined) {
        this.instance = new Pool(_config.DATABASE)
    }
  }

  async addUser(id_email, name, lastName, userId, photo, password, auth, roll) {
    
    this.connection()
    const cli = await this.instance.connect()
    let res

    const query = `
                  insert into usuario(id_email, name, lastName, userId, photo, password, auth, roll)
                  values('${id_email ? id_email : null}', '${name ? name : null}', '${lastName  ? lastName : null}',
                  '${userId ? userId : null}','${photo ? photo : null}', '${password ? password : null}', 
                  '${auth ? auth : null}', '${roll ? roll : null}');
                  `

    try {
      res = await cli.query(query)
      await cli.query('COMMIT')
    } catch (error) {
      await cli.query('ROLLBACK')
      throw new Error(error)      
    }

    return res
  }

  async getUser(id_email) {

    this.connection()
    const cli = await this.instance.connect()
    let res

    const query = `
                  select * from usuario where id_email = '${id_email}'
                  `
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
  User
}