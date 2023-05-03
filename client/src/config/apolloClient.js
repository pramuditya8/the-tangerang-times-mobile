import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://tgrtimes-mobile-server.pramuditya.site/",
  cache: new InMemoryCache(),
});
