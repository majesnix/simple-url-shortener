/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from "inversify";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { IUrlService } from "../../2 - Domain/Services/UrlService";
import { Url } from "../../3 - Database/Models/Url";
import CreateShortUrlArgs from "../Args/CreateShortUrlArgs";
import DeleteUrlArgs from "../Args/DeleteUrlArgs";
import UrlArgs from "../Args/UrlArgs";

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

  constructor(@inject("IUrlService") urlService: IUrlService) {
    this._urlService = urlService;
  }

  @Query((returns) => Url)
  public async Url(@Arg("urlArgs") { ShortUrl }: UrlArgs): Promise<Url> {
    return await this._urlService.GetUrl(ShortUrl);
  }

  @Authorized("read:urls")
  @Query((returns) => [Url])
  public async Urls(): Promise<Url[]> {
    return await this._urlService.GetAllUrls();
  }

  @Mutation((returns) => String)
  public async CreateUrl(
    @Arg("createUrlArgs") { Url }: CreateShortUrlArgs
  ): Promise<string> {
    return (await this._urlService.CreateUrl(Url)).Short;
  }

  @Authorized("delete:urls")
  @Mutation((returns) => Boolean)
  public async DeleteUrl(
    @Arg("deleteUrlArgs") { Id, Short }: DeleteUrlArgs
  ): Promise<boolean> {
    try {
      await this._urlService.DeleteUrl(Id, Short);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
