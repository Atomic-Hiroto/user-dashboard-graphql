const gql = require('graphql-tag');
    
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String! 
    email: String!
    phoneNumber: String
    username: String!
    avatarImage: String
  }

  type AuthData {
    user: User!
    token: String!
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phoneNumber: String
    username: String!
    avatarImage: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthData!
    signIn(input: SignInInput!): AuthData!
  }
`;

module.exports = { typeDefs };