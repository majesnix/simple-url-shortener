import { inject, injectable } from "inversify";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { IUrlService } from "../../2 - Domain/Services/UrlService";
import { Url } from "../../3 - Database/Models/Url";
import CreateShortUrlArgs from "../Args/CreateShortUrlArgs";
import DeleteUrlArgs from "../Args/DeleteUrlsArgs";
import UrlInputType from "../Args/UrlInputType";

export interface IUrlResolver {
  CreateUrl(createUrlArgs: CreateShortUrlArgs): Promise<string>;
  DeleteUrls(deleteUrlArgs: DeleteUrlArgs): Promise<boolean>;
  Url(urlArgs: UrlInputType): Promise<Url>;
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
  public async Url(@Arg("urlArgs") { Short }: UrlInputType): Promise<Url> {
    return await this._urlService.GetUrl(Short);
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
  public async DeleteUrls(
    @Arg("deleteUrlsArgs") { Urls }: DeleteUrlArgs
  ): Promise<boolean> {
    try {
      await this._urlService.DeleteUrls(Urls);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
