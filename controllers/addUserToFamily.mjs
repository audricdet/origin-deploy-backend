import client from "../src/db/connect.mjs";

const addUserToFamily = (request, response) => {
    const userId = request.params.userId;
    const familyName = request.params.familyName;

    client.query(
        `BEGIN;
        WITH family_id AS (
            SELECT id FROM family WHERE name = $2
        ),
        profile_id AS (
            SELECT id FROM profile WHERE user_id = $1
        )
        INSERT INTO user_per_family (family_id, profile_id)
        SELECT family_id.id, profile_id.id
        FROM family_id, profile_id;
        COMMIT;`,
        [userId, familyName],
        (error, result) => {
            if (error) {
                throw error
            }

            response.status(201).send(`User with ID: ${userId} was added to family with name: ${familyName}`);
        }
    );
};

export default addUserToFamily;
