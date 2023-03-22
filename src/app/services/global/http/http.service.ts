import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IHttpResult } from 'src/app/interfaces/global/IHttpResult';

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) {
  }

  private createHeader(header?: HttpHeaders, canFile: boolean = false) {
    if (!header) {
      header = new HttpHeaders();
    }

    if (header) {
      if (!header.has('Content-Type')) {
        if (!canFile) {
          header = header.set('Content-Type', 'application/json');
        } else {
          header = header.set('Content-Type', 'multipart/form-data');
        }
      }

      if (!header.has('Accept')) {
        header = header.set('Accept', 'application/json');
      }

      if (!header.has('Cache-Control')) {
        header = header.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
      }

      if (!header.has('Expires')) {
        header = header.set('Expires', '-1')
      }

      if (!header.has('Pragma')) {
        header = header.set('Pragma', 'no-cache')
      }

      const token = sessionStorage.getItem('token');

      if (token) {
        header = header.set('Authorization', `Bearer ${token}`);
        return header;
      } else {
        return header;
      }
    }

    return
  }

  private errorHandling(res: any): Promise<IHttpResult> {
    return new Promise((resolve, reject) => {

      if (!res) return resolve({ success: false, data: {}, error: 'Erro inesperado, contate o time de desenvolvimento.', timestamp: Date.now() });

      if (!!res.error) {
        switch (res.error.status) {
          case 400:
            resolve({ success: false, data: {}, error: { message: res.error.message }, timestamp: Date.now() });
            break;
          case 401:
            localStorage.clear();
            location.reload();
            resolve({ success: false, data: {}, error: { message: res.error.message }, timestamp: Date.now() });
            break;
          case 404:
            resolve({ success: false, data: {}, error: { message: '404 - O servidor não pode encontrar a página ou recurso solicitado.' }, timestamp: Date.now() });
            break;
          case 504:
            resolve({ success: false, data: {}, error: { message: '504 - O servidor não conseguiu responder a solicitação.' }, timestamp: Date.now() });
            break;

          default:
            if (!!res.error.errors) {
              resolve({ success: false, data: res.error.errors, error: res.error.statusText, timestamp: Date.now() });
            } else {
              resolve({ success: false, data: {}, error: !!res.error.message ? { message: res.error.message } : { message: 'Erro inesperado, contate o time de desenvolvimento.' }, timestamp: Date.now() });
            }
            break;
        }
      }

      if (!res.error) return resolve({ success: true, data: res, error: undefined, timestamp: Date.now() });

    })
  }

  public get(url: string, headers?: HttpHeaders): Promise<IHttpResult> {
    const header = this.createHeader(headers);

    return new Promise(async (resolve) => {

      try {

        const res: any = await firstValueFrom(this.http.get(url, { headers: header, responseType: 'json' })).catch(reason => reason);

        return resolve(await this.errorHandling(res))

      } catch (error) {
        resolve(await this.errorHandling({ res: error }));
      }
    });
  }

  public post(url: string, model?: any, headers?: HttpHeaders, canFile: boolean = false): Promise<IHttpResult> {

    const header = this.createHeader(headers, canFile);

    return new Promise(async (resolve) => {
      try {

        const res: any = await firstValueFrom(this.http.post(url, model, { headers: header, responseType: 'json' })).catch(reason => reason);

        return resolve(await this.errorHandling(res));

      } catch (error) {
        resolve(await this.errorHandling({ res: error }));
      }
    });
  }

  public delete(url: string, headers?: HttpHeaders, canFile: boolean = false): Promise<IHttpResult> {

    const header = this.createHeader(headers, canFile);

    return new Promise(async (resolve) => {
      try {

        const res: any = await firstValueFrom(this.http.delete(url, { headers: header, responseType: 'json' })).catch(reason => reason);

        return resolve(await this.errorHandling(res));

      } catch (error) {
        resolve(await this.errorHandling({ res: error }));
      }
    });
  }

}
