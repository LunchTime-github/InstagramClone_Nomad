require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    }
  },
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`
  );
});

// app.listen({ port: PORT }, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
// });
