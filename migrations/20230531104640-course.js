const schema = require("./schemas/course.v1");
module.exports = {
    async up(db, client) {
        await db.createCollection("course", schema);
        db.collection("course").createIndex({ courseId: 1 });
    },

    async down(db, client) {
        await db.collection("course").drop();
    },
};
