import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/global/IResponse';

export class BaseService<T> {

  URL_BASE: string = '';

  constructor(protected url: string, protected httpSrv: HttpService) {
    this.URL_BASE = `${environment.url_api}/${this.url}`;
  }

  async findCustomOne(options?: any): Promise<IResponse> {
    return await this.httpSrv.post(`${this.URL_BASE}/find/one`, { ...options });
  }

  async findCustomMany(options?: any): Promise<IResponse> {
    return await this.httpSrv.post(`${this.URL_BASE}/find/all`, { ...options });
  }

  async create(data: T): Promise<IResponse> {
    return await this.httpSrv.post(`${this.URL_BASE}/create`, {
      ...data,
    });
  }

  async update(data: T, id: string): Promise<IResponse> {
    return await this.httpSrv.post(`${this.URL_BASE}/update/${+id}`, {
      ...data,
    });
  }

  async remove(id: string): Promise<IResponse> {
    return await this.httpSrv.delete(`${this.URL_BASE}/delete/${+id}`);
  }

}
