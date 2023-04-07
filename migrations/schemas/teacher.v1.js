module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email"],
            properties: {
                name: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                },
            },
        },
    },
};
