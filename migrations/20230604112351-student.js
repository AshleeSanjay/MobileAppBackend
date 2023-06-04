const schema = require("./schemas/student.v1");
module.exports = {
    async up(db, client) {
        await db.createCollection("student", schema);
        db.collection("student").createIndex({ cognitoSid: 1 });
    },

    async down(db, client) {
        await db.collection("student").drop();
    },
};
