const { createUser, login } = require("../controllers/user.controllers");


module.exports = async function (fastify) {
    fastify.post('/register', createUser);
    fastify.post('/login', login);
};