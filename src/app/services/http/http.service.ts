import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL: string;
  constructor(private httpClint: HttpClient) {
    this.baseURL = localStorage.getItem('ks_lang') === 'hin'
      ? 'https://hindi.khulasa-news.com/wp-admin/admin-ajax.php' : 'https://khulasa-news.com/wp-admin/admin-ajax.php';

  }
  public get(apiPath: string, params?: HttpParams) {
    return new Promise((resolve, reject) => {
      this.httpClint.get(this.baseURL + apiPath, { params: params }).subscribe((resp: any) => {
        this.handleResponse(resp).then(data => resolve(data)).catch(err => reject(err));
      },
        err => {
          reject('something went worng');

        })
    })
  }
  private handleResponse(response: any): Promise<any> {
    const status = parseInt(response.status, 10);
    if (status >= 200 && status < 300) {
      return Promise.resolve(response.data);
    }
    else {
      return Promise.reject(response.message);
    }
  }
}
