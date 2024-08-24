const { createUser, login, logout } = require("../controllers/user.controllers");


module.exports = async function (fastify) {
    fastify.post('/register', createUser);
    fastify.post('/login', login);
    fastify.post('/logout', logout);
    fastify.get('/ping',(req, res)=>res.send({message : 'Backend Work !'}))
};