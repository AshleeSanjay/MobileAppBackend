module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email"],
            properties: {
                name: {
                    bsonType: "string",
                },
                cognitoId:{
                    bsonType:"string",
                },
                email: {
                    bsonType: "string",
                },
                mobile: {
                    bsonType: "string",
                },
                userType: {
                    bsonType: "string",
                }
            },
        },
    },
};
