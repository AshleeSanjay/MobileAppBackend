const schema = require("./schemas/assignment.v1");
module.exports = {
    async up(db, client) {
        await db.createCollection("assignment", schema);
        db.collection("assignment");
    },

    async down(db, client) {
        await db.collection("assignment").drop();
    },
};
