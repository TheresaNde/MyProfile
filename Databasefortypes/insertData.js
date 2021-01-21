// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO TheresaNde2021 
                 (ID, COUNTRY, FIRST_NAME, LAST_NAME, BUSINESS_NAME, EMAIL, PHONE_NUMBER, PASSWORD, SOFTWARE_DEVELOPER, TRADING_NAME, BUSINESS_DESCRIPTION, STAFF_SIZE, INDUSTRY, CATEGORY, BUSINESS_TYPE, LEGAL_BUSINESS_NAME, REGISTRATION_TYPE)
                 VALUES 
                 ('1', 'Nigeria', 'Theresa', 'Nde', 'St Theresa' , 'theraniskande@gmail.com', '07085696197', 'paystack123', TRUE, 'St Theresa Healthcare', 'Healthcare outfit that makes healthcare easily accessible to all', '50+ people', 'Health' , 'Hospitals', 'Starter Business', 'St Theresa Healthcare', 'Incorporated Company')
                 `,
    
    (err, res) => {
      if(err) {
          console.log(err)
        console.log('Error or issue with table creation');
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;