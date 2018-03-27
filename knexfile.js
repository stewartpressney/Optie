require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host     : 'ec2-107-20-151-189.compute-1.amazonaws.com',
      user     : 'hmwwgvyxxfezjg',
      password : '0dd92124070431a354ef35a56355ec715979a31c0632c22ed63c3866fb58f1d6',
      database : 'd5oq3jvimembra',
      port     : '5432',
    },//postgres://hmwwgvyxxfezjg:0dd92124070431a354ef35a56355ec715979a31c0632c22ed63c3866fb58f1d6@ec2-107-20-151-189.compute-1.amazonaws.com:5432/d5oq3jvimembra',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};
