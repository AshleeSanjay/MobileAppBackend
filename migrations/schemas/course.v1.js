module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["courseName"],
            properties: {
                courseId: {
                    bsonType: "string",
                },
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
            },
        },
    },
};
