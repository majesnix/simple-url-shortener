import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import gql from "graphql-tag";
import { rootStore } from "../../app";

const withToken = setContext(async () => {
  const { app } = rootStore;
  if (!app.auth0Initiated) {
    await app.onInit().then(async () => {
      const isAuthenticated = await app.auth.isAuthenticated();
      if (isAuthenticated) {
        const token = await app.auth.getTokenSilently();
        return { token };
      }
    });
  } else {
    const isAuthenticated = await app.auth.isAuthenticated();
    if (isAuthenticated) {
      const token = await app.auth.getTokenSilently();
      return { token };
    }
  }
});

//add authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext();
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
        Url(urlArgs: { Short: $Short }) {
          Long
        }
      }
    `,
    URLS: gql`
      query {
        Urls {
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

    DELETE_SHORT_URLS: gql`
      mutation($Urls: [UrlInputType!]!) {
        DeleteUrls(deleteUrlsArgs: { Urls: $Urls })
      }
    `,
  },
};
