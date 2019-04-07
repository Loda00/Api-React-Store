const { Pool } = require('pg')

const { _config } = require('../config/_config')

class Product {
  constructor() {
    this.instance = undefined
  }

  connection() {
    if (this.instance === undefined) {
      this.instance = new Pool(_config.DATABASE)
    }
  }
  
  async getProducts() {

    this.connection()

    const cli = await this.instance.connect()
    
    let res;
    const query = `select c.category, ma.brand, mo.model, p.price, p.stock from producto p INNER JOIN categoria c
                    ON p.category = c.id INNER JOIN marca ma
                    ON p.brand = ma.id INNER JOIN modelo mo
                    ON p.model = mo.id`

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
  Product
}