module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email"],
            properties: {
                cognitoId: {
                    bsonType: "string",
                },
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
                assignmentId: {
                    bsonType: "string",
                },
            },
        },
    },
};
