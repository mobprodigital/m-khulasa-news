import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { PostModel } from 'src/app/model/post.model';
import { HttpParams } from '@angular/common/http';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpService: HttpService) {

  }


  public getMenuCategories(): Promise<NewsCategoryModel[]> {
    return new Promise((resolve, reject) => {

      // let menuCategories: NewsCategoryModel[] = [];
      // if (localStorage.getItem('ks_menu_cat')) {
      //   let cats = JSON.parse(this.getLocalData('menu_cat'));
      //   resolve(cats);
      //   // if (cats) {
      //   //   let localCats = this.parseCategories(cats);
      //   //   resolve(localCats);
      //   // }
      // }
      // else {
        this.httpService.get('', new HttpParams().set('action', 'get_menu'))
          .then((data: any[]) => {
            let menu = this.parseCategories(data);
            this.setLocalData('menu_cat', menu);
           // menuCategories = menu;
            resolve(menu);
          }).catch(err => {
            reject(err);
          })
      //}
    })
  }
  /**
   * get post by id count and from
   * @param categoryId get post by category id
   * @param count count use for number of post
   * @param from (default = 1) offset number from where want to get the news
   */
  public getPost(categoryId: string, count?: number, from?: number): Promise<PostModel[]> {
    return new Promise((resolve, reject) => {

      count = typeof count === "undefined" ? 10 : count;
      from = typeof from === "undefined" ? 1 : from;

      let params = new HttpParams()
        .set("action", "get_post_archive")
        .set("categoryId", categoryId.toString())
        .set("count", count.toString())
        .set("from", from.toString());

      this.httpService.get('', params).then((news: any[]) => {
        let newslist = this.parseNews(news);
        resolve(newslist);
      }).catch(err => {
        reject(err);
      })

    })
  }

  /**
    * get all news categories
    */
  public getNewsCategories(): Promise<NewsCategoryModel[]>;
  /**
   * get single catgeory by id
   * @param categoryId Category id
   */
  public getNewsCategories(categoryId: number): Promise<NewsCategoryModel>;
  public getNewsCategories(args?: undefined | number): Promise<NewsCategoryModel[] | NewsCategoryModel> {
    return new Promise((resolve, reject) => {
      let argsType = typeof args;
      if (argsType === 'number') {
        this.httpService.get('', new HttpParams().set('action', 'get_category').set('catId', args.toString()))
          .then((data: any) => {
            let cats = this.parseCategories([data]);
            resolve(cats[0]);
          })
      }
      else if (argsType === 'undefined') {
        this.httpService.get('', new HttpParams().set('action', 'get_categories')).then((cats: any[]) => {
          let categories = this.parseCategories(cats);
          resolve(categories);
        }).catch(err => {
          resolve(err);
        })
      }
      else {
        reject('Argument type mismatch');
      }
    });
  }


  /**
   * get post by id
   * @param postId post Id 
   */
  public getPostByPostId(postId: number): Promise<PostModel>;
  public getPostByPostId(postIdSlug: string, postType?: PostTypeEnum): Promise<PostModel>;
  public getPostByPostId(args: string | number, postType: PostTypeEnum = PostTypeEnum.Post): Promise<PostModel> {
    return new Promise((resolve, reject) => {
      let argsType = typeof args;
      let slugOrId = ''
      let params = new HttpParams().set('action', 'get_single_post_by_id');
      if (argsType === 'number') {
        params = params.set('postId', args.toString());
      }
      else if (argsType === 'string') {
        params = params.set('postSlug', args.toString()).set('postType', postType);
      }
      else {
        throw console.error("argumnet not match");
      }
      this.httpService.get('', params)
        .then((news: any) => {
          let n = this.parseNews([news]);
          resolve(n[0]);
        }).catch(err => {
          reject(err);
        })
    });
  }


  public getSearchResults(searchTerm: string, count?: number, from?: number): Promise<PostModel[]> {
    return new Promise((resolve, reject) => {
      count = typeof count === "undefined" ? 10 : count;
      from = typeof from === "undefined" ? 1 : from;
      let params = new HttpParams()
        .set('action', 'search_posts')
        .set('search_term', searchTerm)
        .set('count', count.toString())
        .set('from', from.toString())
        .set('content_length', 'short');

      this.httpService.get('', params)
        .then((news: any[]) => {
          let newslist = this.parseNews(news);
          resolve(newslist);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  private parseCategories(cats: any[]) {
    let catArr: NewsCategoryModel[] = [];
    if (cats && cats.length > 0) {
      catArr = cats.map(c => {
        let _cat: NewsCategoryModel = new NewsCategoryModel(parseInt(c.categoryId), c.name);
        _cat.slug = c.slug;
        return _cat;
      })
    }
    return catArr;
  }

  private parseNews(news: any[]) {
    let newslist: PostModel[] = [];
    if (news && news.length > 0) {
      newslist = news.map(n => {
        let _newsls: PostModel = new PostModel();
        _newsls.id = n.id;
        _newsls.title = n.title;
        _newsls.author = n.author;
        _newsls.content = n.content;
        _newsls.publishedDate = n.date;
        _newsls.createDate = n.date;
        _newsls.category = n.category;
        _newsls.slug = n.slug;
        _newsls.categoryList = this.parseCategories(n.categoryList);
        // _newsls.categories=n.category;
        _newsls.featuredImage.small = n.thumbnail || '/aakash_dev/m.khulasa-news/assets/images/news/default.jpg';
        _newsls.featuredImage.original = n.thumbnail || '/aakash_dev/m.khulasa-news/assets/images/news/default.jpg';
        _newsls.featuredImage.medium = n.thumbnail || '/aakash_dev/m.khulasa-news/assets/images/news/default.jpg';
        _newsls.featuredImage.large = n.thumbnail || '/aakash_dev/m.khulasa-news/assets/images/news/default.jpg';
        return _newsls;
      })
    }
    return newslist;
  }
  private async setLocalData(key: string, data: any) {
    localStorage.setItem('ks_' + key, JSON.stringify(data))
  }
  private getLocalData(key: string): any {
    return localStorage.getItem('ks_' + key);
  }
}
