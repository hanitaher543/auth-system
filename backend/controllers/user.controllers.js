const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const User           = require('../models/user');
const Token          = require('../models/token');

// API REST POST : RESGISTER
async function createUser(req, res) {

    // Read data from the request body
    const {fullName, email, password, phoneNumber} = req.body;
    console.log(req.body);
    try{
        // crypt my password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create an instance of my User model
        const newUser = await User.create({
            fullName,
            email,
            password : hashedPassword,
            phoneNumber
        });

        res.status(200).send({message: 'User registered successfully', user: newUser});

    }catch(error){
        console.error('Error occurred during User creation :', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
};

async function login(req, res) {
    // Read data from the request body
    const { email, password } = req.body;
    
    try {
      // Get user by email from DB 
      const user = await User.findOne({ where: { email } });
      
      // Check if user exists or not from db using email
      if (!user) {
        return res.status(404).send({ message: "Email invalid !" });
      }
  
      // Check if password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ error: 'Invalid Password !' });
      }
  
      // Revoke existing tokens for the user
      await Token.update({ state: 'revoked' }, { where: { userId: user.id } });
  
      // Create new access token
      const token = jwt.sign({ id: user.id }, 'mkljbhghvbkjcghjklmlkjhghj', { expiresIn: '15m' });
      
      // Create a new token entry in the database
      await Token.create({
        token,
        userId: user.id,
        state: 'active'
      });
  
      // Send response with user details and token
      res.status(200).send({ message: 'Login successful', id: user.id, email: user.email, token });
    
    } catch (error) {
      res.status(500).send({ error: 'Login failed', details: error });
    }
  };
  

module.exports = {
    createUser,
    login
};
