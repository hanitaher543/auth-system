// IMPORTS 
const fastify = require('fastify') ({logger : true});
const PORT = 3000;




// Routing





// Run server and connect to db

const start = async () =>{

    try{
        await fastify.listen({ port : PORT});
        console.log(`Server is running on port ${PORT}`);

    } catch(error){
        console.log(`Server failed to start on port ${PORT}`);
        fastify.log.error(error);
        process.exit(1);
    }
};

start();