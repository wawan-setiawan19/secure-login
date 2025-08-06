const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

const registerUser = async ({name, email, password}) => { 
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({name, email, password: hashedPassword});

    return user;
}

const loginUser = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
  
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  };

  const getProfile = async (userId) => {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error('User not found');
  
    // Return only safe fields
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };

module.exports = {
    registerUser,
    loginUser,
    getProfile
}