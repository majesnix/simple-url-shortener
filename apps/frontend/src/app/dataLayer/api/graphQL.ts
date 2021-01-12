import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import gql from "graphql-tag";
import Auth from "../auth/Auth";

const withToken = setContext(async () => {
  if (!Auth.isReady) {
    await Auth.init().then(async () => {
      const isAuthenticated = await Auth.client.isAuthenticated();
      if (isAuthenticated) {
        const token = await Auth.client.getTokenSilently();
        console.log("tok", token);
        return { token };
      }
    });
  } else {
    const isAuthenticated = await Auth.client.isAuthenticated();
    if (isAuthenticated) {
      const token = await Auth.client.getTokenSilently();
      return { token };
    }
  }
});

//add authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext();
  console.log("Token", token);
  operation.setContext((context) => ({
    headers: {
      ...context.headers,
      Authorization: token ? token : "",
    },
  }));
  return forward(operation);
});

const link = ApolloLink.from([withToken, authMiddleware]);

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: concat(
    link,
    new HttpLink({
      uri: `${process.env.NX_GQL_URL}/graphql`,
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
  ENDPOINT: `${process.env.NX_GQL_URL}/graphql`,

  QUERY: {
    URL: gql`
      query($Short: String!) {
        Url(urlArgs: { ShortUrl: $Short }) {
          Long
        }
      }
    `,
    URLS: gql`
      query {
        Urls {
          Id
          Short
          Long
        }
      }
    `,
  },

  MUTATION: {
    CREATE_SHORT_URL: gql`
      mutation($Url: String!) {
        CreateUrl(createUrlArgs: { Url: $Url })
      }
    `,

    DELETE_SHORT_URL: gql`
      mutation($Id: String!, $Short: String!) {
        DeleteUrl(deleteUrlArgs: { Id: $Id, Short: $Short })
      }
    `,
  },
};
