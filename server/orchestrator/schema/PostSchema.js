const axios = require("axios");
const { appUrl, usersUrl } = require("../config/url");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    id: ID
    title: String
    slug: String
    content: String
    imgUrl: String
    categoryId: Int
    authorId: String
    Category: Category
    Author: Author
    Tags: [Tags]
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID
    name: String
  }

  type Tags {
    id: ID
    postId: Int
    name: String
  }

  type Author {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Message {
    message: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    posts: [Post]
    post(id: ID): Post

  }

  type Mutation {
    addPost(title: String, content: String, imgUrl: String, categoryId: Int, authorId: String, tags: String ) : Message
    editPost(id: ID, title: String, content: String, imgUrl: String, categoryId: Int ) : Message
    deletePost( id: ID ) : Post

  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const postsCache = await redis.get("app:posts");
        if (postsCache) {
          const data = JSON.parse(postsCache);
          return data;
        } else {
          const { data } = await axios.get(appUrl + "/posts");
          const { data: user } = await axios.get(usersUrl + "/users");

          data.map((post) => {
            const author = user.map((user) => {
              return post.authorId === user._id ? (post.Author = user) : "";
            });
            return {
              ...post,
              author,
            };
          });

          await redis.set("app:posts", JSON.stringify(data));
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
    post: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.get(appUrl + "/posts/" + id);

        const { data: user } = await axios.get(
          usersUrl + "/users/" + data.authorId
        );

        data.Author = data.authorId === user._id ? user : "";

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
    addPost: async (_, args) => {
      try {
        const { title, content, imgUrl, categoryId, authorId, tags } = args;

        await axios.get(usersUrl + "/users/" + authorId);

        const { data } = await axios.post(appUrl + "/posts", {
          title,
          content,
          imgUrl,
          categoryId,
          authorId,
          tags,
        });

        await redis.del("app:posts");

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
    deletePost: async (_, args) => {
      try {
        const { id } = args;

        const { data } = await axios.delete(appUrl + "/posts/" + id);

        await redis.del("app:posts");

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
    editPost: async (_, args) => {
      try {
        const { id, title, content, imgUrl, categoryId } = args;

        const { data } = await axios.put(appUrl + "/posts/" + id, {
          title,
          content,
          imgUrl,
          categoryId,
        });

        await redis.del("app:posts");

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
