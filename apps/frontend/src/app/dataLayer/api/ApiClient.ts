/**
 * Adjustments for GQL implementation
 * https://graphql.org/learn/best-practices/
 */

import { GRAPHQL, graphQLClient } from "./graphQL";
import { CreateShortUrlInput, QueryUrl, UrlData } from "./graphQLTypes";

/**
 * Manages all requests to the aye-player backend
 */
class ApiClient {
  /**
   * Resolves the target URL of the short url/id
   */
  async resolveId(id: string): Promise<string> {
    const {
      data: { Url: {
        Long
      } },
    } = await graphQLClient.query<UrlData, QueryUrl>({
      query: GRAPHQL.QUERY.URL,
      variables: {
        short: id,
      },
    });

    return Long;
  }

  /**
   * Create a new short url and returns it
   */
  async createShortUrl(url: string): Promise<string> {
    const {
      data: { CreateUrl: short },
    } = await graphQLClient.mutate<{ CreateUrl: string }, CreateShortUrlInput>({
      mutation: GRAPHQL.MUTATION.CREATE_SHORT_URL,
      variables: {
        url: url,
      },
    });

    return short;
  }
}

export default new ApiClient();
