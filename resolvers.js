const User = require('./models/User');
const bcrypt = require('bcryptjs');
const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    }
  },
  Mutation: {
    signUp: async (parent, {input}, context) => {
      const {firstName, lastName, email, password, phoneNumber, username, avatarImage} = input;
      const user = await User.create({firstName, lastName, email, password, phoneNumber, username, avatarImage});
      const token = await user.generateAuthToken();
      return {user, token};
    },
    signIn: async (parent, {input}, context) => { 
      const {email, password} = input;
      const user = await User.findOne({email});
      if(!bcrypt.compareSync(password,user.password)) throw new Error('Wrong Password')
      if(!user) throw new Error('Invalid credentials');
      const token = await user.generateAuthToken();
      return {user, token};
    }
  }
};

module.exports = {resolvers};