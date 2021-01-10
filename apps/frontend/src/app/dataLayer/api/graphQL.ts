import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token") || null;
  //add authorization header
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: `${process.env.NX_GQL_URL}/gql`,
      fetch,
    })
  ),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

export const GRAPHQL = {
  ENDPOINT: `${process.env.NX_GQL_URL}/gql`,

  QUERY: {
    URL: gql`
      query($short: String!) {
        Url(urlArgs: { ShortUrl: $short}) {
          Long
        }
      }
    `,
  },

  MUTATION: {
    CREATE_SHORT_URL: gql`
      mutation($url: String!) {
        CreateUrl(createUrlArgs: { Url: $url })
      }
    `,
  },
};
