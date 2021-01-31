import { inject, injectable } from "inversify";
import { nanoid } from "nanoid";
import { Connection } from "typeorm";
import { Url } from "../../3 - Database/Models/Url";
import { UrlDo } from "../DomainObjects/UrlDo";

export interface IUrlService {
  CreateUrl(urlInput: string): Promise<Url>;
  DeleteUrls(urls: UrlDo[]): Promise<void>;
  GetUrl(Short: string): Promise<Url | undefined>;
  GetAllUrls(): Promise<Url[]>;
}

@injectable()
export class UrlService implements IUrlService {
  private readonly _connectionProvider: Connection;

  constructor(@inject("ConnectionProvider") connectionProvider: Connection) {
    this._connectionProvider = connectionProvider;
  }

  async CreateUrl(urlInput: string): Promise<Url> {
    const expression = /^(ftp|http|https):\/\/[^ "]+$/;
    const regex = new RegExp(expression);

    try {
      if (urlInput.match(regex)) {
        const id = nanoid(10);

        const urlsRepo = this._connectionProvider.getRepository(Url);

        const url = new Url(urlInput, id);
        await urlsRepo.save(url);

        return url;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteUrls(urls: UrlDo[]) {
    const urlsRepo = this._connectionProvider.getRepository(Url);

    for (const { Short } of urls) {
      await urlsRepo
        .createQueryBuilder()
        .delete()
        .where("Short = :Short", { Short })
        .execute();
    }
  }

  async GetUrl(Short: string) {
    try {
      const urlRepo = this._connectionProvider.getRepository(Url);
      const url = await urlRepo.findOne({ where: { Short } });

      if (url) {
        return url;
      }
      return undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async GetAllUrls() {
    const urlsRepo = this._connectionProvider.getRepository(Url);

    return await urlsRepo.find();
  }
}
