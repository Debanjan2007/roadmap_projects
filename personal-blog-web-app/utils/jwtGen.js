const jwt = require('jsonwebtoken');

const createToken = (userData) => {
  if (!userData || !userData.userName) {
    console.log("❌ Invalid user data passed to createToken");
    return null;
  }

  const token = jwt.sign(
    {
      userName: userData.userName,
      role: userData.role || 'client'
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY || '2h'
    }
  );

  return token;
};

module.exports = createToken;
