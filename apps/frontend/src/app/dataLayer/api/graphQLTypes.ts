export type UrlInputType = { Short: string; Long?: string };

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
  _text: string[];
  jsonb: string;
}

export interface QueryUrl {
  Short: Scalars["String"];
}

export interface UrlData {
  Url: {
    Short: Scalars["String"];
    Long: Scalars["String"];
  };
}

export interface UrlsData {
  Urls: {
    Short: Scalars["String"];
    Long: Scalars["String"];
  }[];
}

export interface CreateShortUrlInput {
  Url: Scalars["String"];
}

export interface CreateShortUrlResponse {
  CreateUrl: Scalars["String"];
}

export interface UrlDeleteInput {
  Urls: UrlInputType[];
}
