module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email"],
            properties: {
                name: {
                    bsonType: "string",
                },
                cognitoSid: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                },
                mobile: {
                    bsonType: "string",
                },
                userType: {
                    bsonType: "string",
                },
            },
        },
    },
};
