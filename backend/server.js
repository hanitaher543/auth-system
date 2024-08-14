// IMPORTS 
const fastify   = require('fastify') ({logger : true});
const sequelize = require('./config/database');
const PORT      = 4000;
const fastifyJwt = require('fastify-jwt');

// Register the JWT plugin
fastify.register(fastifyJwt, {
    secret: 'b1f1b7ec5e1a4f5d8bfc1f2e1b4a6b1c',
});

// Routing
fastify.register(require('./routes/router'));


// Run server and connect to db
const start = async () =>{

    try{
        await fastify.listen({ port : PORT});
        console.log(`Server is running on port ${PORT}`);
        await sequelize.authenticate(); // verifies the connection to the Sequelize database 
        console.log('Database connection established successfully!');      

    } catch(error){
        console.log(`Server failed to start on port ${PORT}`);
        fastify.log.error(error);
        process.exit(1);
    }
};

start();