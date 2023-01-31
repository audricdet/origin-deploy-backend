import * as dotenv from 'dotenv'
import pkg from 'pg';

dotenv.config()
const { Client } = pkg;


const client = new Client({
    host: "ec2-34-247-72-29.eu-west-1.compute.amazonaws.com",
    database: process.env.DATABASE_URL,
    port: 5432,
    user: 'fenwhcjlhdxhab',
    password: process.env.DATABASE_PWD,
})

client.connect((err) => {
if (err) {
    console.error('connection error', err.stack)
} else {
    console.log('connected')
}
})


// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });

export default client;