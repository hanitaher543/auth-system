const login      = require("../controllers/user.controllers");
const createUser = require("../controllers/user.controllers");

module.exports = async function (fastify) {
    fastify.post('/register', createUser);
    fastify.post('/login', login);
};