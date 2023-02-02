import client from "../../db/connect.mjs";
import bcrypt from "bcrypt";
import express  from "express";
const registerRouter = express.Router()

// Define a function for creating a new user
const register = async (request, response) => {
    const {
        email,
        password
    } = request.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Write a SQL query to insert the new user into the database
    const emailsFromDB = await client.query(`SELECT email FROM users WHERE email = $1`, [email]);

    if (emailsFromDB.rows.length === 1) {
        return res.send({ error: 'This email adress already exist' })
    }

    client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        }
    );
};

registerRouter.post('/register', register)

export default registerRouter