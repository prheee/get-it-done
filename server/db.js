const pg = require('pg');

// set up a free elephantSQL cloud db 
const myURI = process.env.NODE_ENV === 'test' ? 'postgres://gsckydzy:suw_XuHUYptyJuwxxjTG2wFaKJ-4YpcZ@salt.db.elephantsql.com:5432/gsckydzy' : 'postgres://ehliqcng:RvjiMtUmf1LhRdQN-H6CxZxDLP_lsHco@salt.db.elephantsql.com:5432/ehliqcng'

const pool = new pg.Pool({
  connectionString: myURI
})

// check if the db is connected
pool.connect()
    .then((data) => {
      console.log('connected to the database...')
    })
    .catch((err) => console.log('error occured while connecting to db',err));

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  }
}