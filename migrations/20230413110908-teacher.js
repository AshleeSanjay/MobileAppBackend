const schema = require("./schemas/teacher.v1");
module.exports = {
    async up(db, client) {
        await db.createCollection("teacher", schema);
        db.collection("teacher").createIndex({ cognitoId: 1 });
    },

    async down(db, client) {
        await db.collection("teacher").drop();
    },
};
