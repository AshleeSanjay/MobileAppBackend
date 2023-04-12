module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["fname", "email", "mobile", "password"],
            properties: {
                name: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                },
                mobile: {
                    bsonType: "string",
                },
                password: {
                    bsonType: "string",
                },
                userType: {
                    bsonType: "double",
                },
            },
        },
    },
};
