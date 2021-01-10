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

export const graphQLClientPlaylists = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: "https://api.dcl.re/gql",
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
  ENDPOINT: "https://api.dcl.re/gql",

  QUERY: {
    PLAYLISTS: gql`
      query {
        Playlists {
          Id
          Name
          Duration
          SongsCount
          IsReadonly
        }
      }
    `,
  },

  MUTATION: {
    CREATE_PLAYLIST: gql`
      mutation($name: String!) {
        CreateNewPlaylist(createNewPlaylistArgs: { Name: $name }) {
          Id
        }
      }
    `,
  },
};
