const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname,'products.db');


const app = express();
app.use(express.json());

let db = null;

let dbConnection = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      })
      app.listen(3007, () => {
        console.log('Server stated at http://localhost:3007/')
      })
    } catch (e) {
      console.log(`db error ${e.message}`)
      process.exit(1)
    }
  }
  
  dbConnection()


  app.get('/products',async (request,response)=>{
    const getQuery = `SELECT * FROM product;`;
    const dbResponse = await db.all(getQuery)
    response.send(dbResponse);
  })

  app.get('/productsSum',async (request,response)=>{
    const getQuery = `SELECT sum(price*quantity) as totol_sum FROM product;`;
    const dbResponse = await db.get(getQuery)
    response.send(dbResponse);
  })

  module.exports = app



