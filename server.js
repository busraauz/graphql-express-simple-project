const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Sample data
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

// GraphQL schema
const schema = buildSchema(`
  type User {
    id: Int
    name: String
    age: Int
  }

  type Query {
    getUser(id: Int!): User
    getUsers: [User]
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
  }
`);

// Root resolver
const root = {
  getUser: ({ id }) => users.find(user => user.id === id),
  getUsers: () => users,
  addUser: ({ name, age }) => {
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    return newUser;
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server is running on http://localhost:4000/graphql'));