const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

// Database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Has been Connected`);
  })
  .catch(err => {
    console.log("Failed to connect to the DB: "+err.message);
  });

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });

startStandaloneServer(server).then(({url})=>{
      console.log(`🚀 Server listening at: ${url}`);
  });
  