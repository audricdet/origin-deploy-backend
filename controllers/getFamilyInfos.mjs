import client from "../src/db/connect.mjs";

const getFamilyInfos = (request, response) => {
    const name = request.params.name;

    client.query(
        "SELECT name FROM family WHERE name = $1",
        [name],
        (error, result) => {
            if (error) {
                response.status(500).json({
                    error
                });
            } else {
                response.status(200).json(result.rows);
            }
        }
    );
};

export default getFamilyInfos