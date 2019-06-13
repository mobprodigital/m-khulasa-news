import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { resolve, reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {

  }

  public getAllFixtures(params: HttpParams) {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://cricapi.khulasa-news.com/cricketApi/getAllfixtures.php', { params: params }).
        subscribe((res: any) => {
          this.handleResponse(res)
            .then(data => { resolve(data) })
            .catch(err => { reject(err) });
        },
          err => { reject("something went worng") },
          () => { }
        )
    })
  }
  public getLiveScore(params: HttpParams) {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://cricapi.khulasa-news.com/cricketApi/getLiveScores.php', { params: params })
        .subscribe((res: any) => {
          this.handleResponse(res)
            .then(data => { resolve(data) })
            .catch(err => { reject(err) });
        })
      err => {
        reject('something went worng');
      }
      () => { }
    })
  }

  public handleResponse(response: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (response.status) {
        resolve(response.data);
      }
      else {
        reject(response.message);
      }

    })
  }
}
