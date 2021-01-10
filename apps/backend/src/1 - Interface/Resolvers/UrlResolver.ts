import express from 'express';
import { inject, injectable } from 'inversify';
import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { IUrlService } from '../../2 - Domain/Services/UrlService';
import { Url } from '../../3 - Database/Models/Url';

interface CreateShortUrlArgs {
  url: string;
}

interface DeleteUrlArgs {
  id: string;
}

interface UrlArgs {
  shortUrl: string;
}

export interface IUrlResolver {
  CreateUrl(
    createUrlArgs: CreateShortUrlArgs,
    context: express.Request
  ): Promise<string>;
  DeleteUrl(
    deleteUrlArgs: DeleteUrlArgs,
    context: express.Request
  ): Promise<boolean>;
  Url(urlArgs: UrlArgs, context: express.Request): Promise<Url>;
  Urls(): Promise<Url[]>;
}

@injectable()
@Resolver(Url)
export default class UrlResolver implements IUrlResolver {
  private readonly _urlService: IUrlService;

  constructor(@inject('IUrlService') urlService: IUrlService) {
    this._urlService = urlService;
  }

  @Query((returns) => Url)
  public async Url(@Args() urlArgs: UrlArgs): Promise<Url> {
    return await this._urlService.GetUrl(urlArgs.shortUrl);
  }

  @Query((returns) => [Url])
  @Authorized(['admin'])
  public async Urls(): Promise<Url[]> {
    return await this._urlService.GetAllUrls();
  }

  @Mutation((returns) => String)
  public async CreateUrl(
    @Arg('createUrlArgs') createUrlArgs: CreateShortUrlArgs
  ): Promise<string> {
    return (await this._urlService.CreateUrl(createUrlArgs.url)).short;
  }

  @Mutation((returns) => Boolean)
  public async DeleteUrl(
    @Arg('deleteUrlArgs') deleteUrlArgs: DeleteUrlArgs
  ): Promise<boolean> {
    try {
      await this._urlService.DeleteUrl(deleteUrlArgs.id);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
