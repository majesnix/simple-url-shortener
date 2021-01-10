import { inject, injectable } from 'inversify';
import shortid from 'shortid';
import { Connection } from 'typeorm';
import { Url } from '../../3 - Database/Models/Url';

export interface IUrlService {
  CreateUrl(url: string): Promise<{ base: string; short: string }>;
  DeleteUrl(id: string): Promise<void>;
  GetUrl(shortUrl: string): Promise<Url | undefined>;
  GetAllUrls(): Promise<Url[]>;
}

@injectable()
export class UrlService implements IUrlService {
  private readonly _connectionProvider: Connection;

  constructor(@inject('ConnectionProvider') connectionProvider: Connection) {
    this._connectionProvider = connectionProvider;
  }

  async CreateUrl(urlInput: string): Promise<{ base: string; short: string }> {
    // tslint:disable-next-line:max-line-length
    const expression = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const regex = new RegExp(expression);

    try {
      if (urlInput.match(regex)) {
        const id = shortid.generate();

        const urlsRepo = this._connectionProvider.getRepository(Url);

        const url = new Url(urlInput, id);
        await urlsRepo.save(url);

        return {
          base: urlInput,
          short:
            process.env.NODE_ENV !== 'production'
              ? `http://${process.env.NX_BASE_URL}:${process.env.NX_PORT}/${id}`
              : `https://${process.env.NX_BASE_URL}/${id}`,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteUrl(id: string) {
    const urlsRepo = this._connectionProvider.getRepository(Url);
    await urlsRepo.delete(id);
  }

  async GetUrl(shortUrl: string) {
    try {
      const urlRepo = this._connectionProvider.getRepository(Url);
      const url = await urlRepo.findOne({ where: { shortUrl } });

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
