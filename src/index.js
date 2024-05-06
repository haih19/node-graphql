const express = require("express");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const { ApolloServer } = require("apollo-server-express");

const app = express();

app.use(express.json());

const port = 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create an async function to start the server
async function startServer() {
  await server.start(); // Start the Apollo Server
  server.applyMiddleware({ app }); // Apply the middleware to the Express application

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer(); // Call the async function to start everything
