import { inject, injectable } from "inversify";
import shortid from "shortid";
import { Connection } from "typeorm";
import { Url } from "../../3 - Database/Models/Url";

export interface IUrlService {
  CreateUrl(urlInput: string): Promise<Url>;
  DeleteUrl(id: string, short: string): Promise<void>;
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
    // tslint:disable-next-line:max-line-length
    const expression = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const regex = new RegExp(expression);

    try {
      if (urlInput.match(regex)) {
        const id = shortid.generate();

        const urlsRepo = this._connectionProvider.getRepository(Url);

        const url = new Url(urlInput, id);
        await urlsRepo.save(url);

        return url;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteUrl(id: string, shortid: string) {
    console.log("id", id, shortid);
    const urlsRepo = this._connectionProvider.getRepository(Url);

    await urlsRepo
      .createQueryBuilder()
      .delete()
      .where("Id = :id AND Short = :shortid", { id, shortid })
      .execute();
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
