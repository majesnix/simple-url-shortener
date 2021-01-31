/**
 * Adjustments for GQL implementation
 * https://graphql.org/learn/best-practices/
 */

import { GRAPHQL, graphQLClient } from "./graphQL";
import {
  CreateShortUrlInput,
  CreateShortUrlResponse,
  QueryUrl,
  UrlData,
  UrlDeleteInput,
  UrlInputType,
  UrlsData,
} from "./graphQLTypes";

/**
 * Manages all requests to the aye-player backend
 */
class ApiClient {
  /**
   * Resolves the target URL of the short url/id
   */
  async resolveId(id: string): Promise<string> {
    const {
      data: {
        Url: { Long },
      },
    } = await graphQLClient.query<UrlData, QueryUrl>({
      query: GRAPHQL.QUERY.URL,
      variables: {
        Short: id,
      },
    });

    return Long;
  }

  /**
   * Create a new short url and returns it
   */
  async createShortUrl(Url: string): Promise<string> {
    const {
      data: { CreateUrl: Short },
    } = await graphQLClient.mutate<CreateShortUrlResponse, CreateShortUrlInput>(
      {
        mutation: GRAPHQL.MUTATION.CREATE_SHORT_URL,
        variables: {
          Url,
        },
      }
    );

    return Short;
  }

  /**
   * Get all Urls
   */
  async getAllUrls(): Promise<UrlsData> {
    const { data } = await graphQLClient.query<UrlsData, void>({
      query: GRAPHQL.QUERY.URLS,
    });

    return data;
  }

  /**
   * Delete Url
   */
  async deleteUrls(urls: UrlInputType[]): Promise<void> {
    await graphQLClient.mutate<void, UrlDeleteInput>({
      mutation: GRAPHQL.MUTATION.DELETE_SHORT_URLS,
      variables: {
        Urls: urls,
      },
    });
  }
}

export default new ApiClient();
