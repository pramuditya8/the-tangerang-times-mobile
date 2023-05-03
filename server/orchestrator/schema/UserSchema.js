const axios = require("axios");
const { usersUrl, appUrl } = require("../config/url");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    user(_id: ID): User

  }

  type Mutation {
    addUser(username: String, email: String, password: String, phoneNumber: String, address: String) : User
    deleteUser( _id: ID ) : User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const usersCache = await redis.get("users:users");
        if (usersCache) {
          const data = JSON.parse(usersCache);
          return data;
        } else {
          const { data } = await axios.get(usersUrl + "/users");
          await redis.set("users:users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.statusText,
            http: {
              status: error.response.status,
            },
          },
        });
      }
    },
    user: async (_, args) => {
      try {
        const { _id } = args;

        const { data } = await axios.get(usersUrl + "/users/" + _id);

        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.statusText,
            http: {
              status: error.response.status,
            },
          },
        });
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { username, email, password, phoneNumber, address } = args;

        const { data } = await axios.post(usersUrl + "/users/register", {
          username,
          email,
          password,
          phoneNumber,
          address,
        });
        console.log(data);

        await redis.del("users:users");

        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.statusText,
            http: {
              status: error.response.status,
            },
          },
        });
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;

        const { data } = await axios.delete(usersUrl + "/users/" + _id);
        const { data: post } = await axios.delete(
          appUrl + "/posts/author/" + _id
        );

        await redis.del("users:users");
        if (post > 0) {
          await redis.del("app:posts");
        }

        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.statusText,
            http: {
              status: error.response.status,
            },
          },
        });
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
