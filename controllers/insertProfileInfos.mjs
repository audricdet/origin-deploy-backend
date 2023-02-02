import client from "../src/db/connect.mjs";

const insertProfileInfos = (request, response) => {
    const {
        name,
        lastname,
        date_of_birth,
        place_of_birth,
        school, 
        work,
        hobby, 
        country, 
        bio, 
        user_id, 
        profile_picture,
        prive, 
        facebbok_id,
        google_id, 
        apple_id
    } = request.body;

    client.query(
        `INSERT INTO profile (name,
            lastname,
            date_of_birth,
            place_of_birth,
            school, 
            work,
            hobby, 
            country, 
            bio, 
            user_id, 
            profile_picture,
            prive, 
            facebbok_id,
            google_id, 
            apple_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [name, lastname, date_of_birth, place_of_birth, school, work, hobby, country, bio, user_id, profile_picture, prive, facebbok_id, google_id, apple_id],
        (error, result) => {
            if (error) {
                throw error;
            }

            response.status(201).send(`Profile added with ID: ${result.insertId}`);
        }
    );
};

export default insertProfileInfos;