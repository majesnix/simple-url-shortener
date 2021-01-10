import { inject, injectable } from 'inversify';
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { IUrlService } from '../../2 - Domain/Services/UrlService';
import { Url } from '../../3 - Database/Models/Url';
import CreateShortUrlArgs from '../Args/CreateShortUrlArgs';
import DeleteUrlArgs from '../Args/DeleteUrlArgs';
import UrlArgs from '../Args/UrlArgs';

export interface IUrlResolver {
  CreateUrl(createUrlArgs: CreateShortUrlArgs): Promise<string>;
  DeleteUrl(deleteUrlArgs: DeleteUrlArgs): Promise<boolean>;
  Url(urlArgs: UrlArgs): Promise<Url>;
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
  public async Url(@Arg('urlArgs') urlArgs: UrlArgs): Promise<Url> {
    return await this._urlService.GetUrl(urlArgs.ShortUrl);
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
    return (await this._urlService.CreateUrl(createUrlArgs.Url)).Short;
  }

  @Mutation((returns) => Boolean)
  @Authorized(['admin'])
  public async DeleteUrl(
    @Arg('deleteUrlArgs') deleteUrlArgs: DeleteUrlArgs
  ): Promise<boolean> {
    try {
      await this._urlService.DeleteUrl(deleteUrlArgs.Id);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
