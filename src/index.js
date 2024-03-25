const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// Use Express's built-in middleware to parse JSON
app.use(express.json());

const port = 8080;

// Use POST (and optionally GET) for the GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type RootQuery {
          events: [String!]!
      }

      type RootMutation {
          createEvent(name: String): String
      }

      schema {
          query: RootQuery 
          mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return ["Romantic", "Cooking", "Sailing"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true, // Enables the GraphiQL IDE for easy testing
  })
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
