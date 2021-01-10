export type Maybe<T> = T | null;

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
  short: Scalars["String"];
}

export interface UrlData {
  Url: {
    Id: Scalars["String"];
    Short: Scalars["String"];
    Long: Scalars["String"];
  };
}

export interface CreateShortUrlInput {
  url: Scalars["String"];
}
