module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["courseName"],
            properties: {
                cognitoSid: {
                    bsonType: "string",
                },
                cognitoId: {
                    bsonType: "string",
                },
                courseName: {
                    bsonType: "string",
                },
                courseContent: {
                    bsonType: "string",
                },
                userType: {
                    bsonType: "string",
                },
                flag: {
                    bsonType: "string",
                },
            },
        },
    },
};
