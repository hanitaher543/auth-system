const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const User           = require('../models/user');
const Token          = require('../models/token');

// API REST POST : RESGISTER
async function createUser(req, res) {

    // Read data from the request body
    const {fullName, email, password} = req.body;
    console.log(req.body);
    try{
        // crypt my password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create an instance of my User model
        const newUser = await User.create({
            fullName,
            email,
            password : hashedPassword
        });

        res.status(200).send({message: 'User registered successfully', user: newUser});

    }catch(error){
        console.error('Error occurred during User creation :', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
};

async function login(req, res) {

     // Read data from the request body
     const {email, password} = req.body;
     try{
        // Get user by email from DB 
        const user = await User.findOne({where :{email}});
        // Check if user exist or no from db using email
        if(!user){
            return res.status(404).send({ message : "Email invalid !"});
        };
        // Check if user exist or no from db using password
        const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.code(404).send({ error: 'Invalid Password !' });
            }

         // Access Token & Refresh Token
         const accessToken   =   jwt.sign({ id: user.id }, 'mkljbhghvbkjcghjklmlkjhghj',  { expiresIn: '15m' });
         const refreshToken  =   jwt.sign({ id: user.id }, 'kjhvcxcfghjkjhgghjkllkjhgvc', { expiresIn: '7d' });

         await Token.create({accessToken : accessToken , refreshToken : refreshToken,  userId : user.id})

         res.status(200).send({message : 'Login successful', accessToken, refreshToken});    


     }catch(error){
        res.status(500).send({error: 'Login failed', details: error});
     }
    
};

module.exports = {
    createUser,
    login
};
