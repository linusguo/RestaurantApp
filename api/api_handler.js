
const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const issue = require('./issue.js');
const auth = require('./auth.js');
const dish = require('./dish.js');

function getContext({ req }) {
  const user = auth.getUser(req);
  return { user };
}

const resolvers = {
  Query: {
    about: about.getMessage,
    user: auth.resolveUser,
    issueList: issue.list,
    issue: issue.get,
    issueCounts: issue.counts,
    dishList: dish.menu,
    shoppingBag: dish.bag,
    orderById: dish.orderById,
    ordersByEmail: dish.ordersByEmail,
    orderNumbers: dish.orderNumbers,

  },
  Mutation: {
    setAboutMessage: about.setMessage,
    issueAdd: issue.add,
    issueUpdate: issue.update,
    issueDelete: issue.delete,
    issueRestore: issue.restore,
    dishAdd: dish.dishAdd,
    dishMinus: dish.dishMinus,
    orderAdd : dish.orderAdd
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  playground: true,
  introspection: true,
  context: getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  let cors;
  if (enableCors) {
    const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
    const methods = 'POST';
    cors = { origin, methods, credentials: true };
  } else {
    cors = 'false';
  }
  server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };
