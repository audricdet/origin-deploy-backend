import client from "../src/db/connect.mjs";

const getAllFamilyMembers = (request, response) => {
    const familyName = request.params.name;

    client.query(
        `SELECT users.* FROM users
        INNER JOIN profile ON users.id = profile.user_id
        INNER JOIN user_per_family ON profile.id = user_per_family.profile_id
        INNER JOIN family ON user_per_family.family_id = family.id
        WHERE family.name = $1`,
        [familyName],
        (error, result) => {
            if (error) {
                throw error
            }

            response.status(200).json(result.rows);
        }
    );
}

export default getAllFamilyMembers