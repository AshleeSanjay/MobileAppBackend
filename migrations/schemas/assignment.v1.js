module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
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
                assignmentTitle: {
                    bsonType: "string",
                },
                questionOne: {
                    bsonType: "string",
                },
                questionTwo: {
                    bsonType: "string",
                },
                answerOne: {
                    bsonType: "string",
                },
                answerTwo: {
                    bsonType: "string",
                },
            },
        },
    },
};
