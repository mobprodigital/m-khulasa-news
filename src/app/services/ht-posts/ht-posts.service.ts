import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HtPostsService {

  constructor(
    private http: HttpClient,

  ) { }

  public getTopNews() {
    this.http.get(
      'http://news.htdscontent.com/news/rss/jackmorris/ht/topnews'
    ).subscribe(
      (resp) => {
        console.log(resp);
      },
      error => {
        console.log(error);
      }
    )
  }



}
