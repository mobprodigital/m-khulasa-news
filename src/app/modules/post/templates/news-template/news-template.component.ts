import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostModel } from 'src/app/model/post.model';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.scss']
})
export class NewsTemplateComponent implements OnInit {

  @ViewChild('newstemplatecontainer') maincontainer: ElementRef;
  @Input() count: number = 10;
  @Input() title: string;
  @Input() set categoryID(value: string) {
    this._categoryId = value;
    this.scrollToTop();
    this.getpostById();
  }

  public loadingPosts: boolean = false;
  public postList: PostModel[] = [];
  public errorMsg: string = '';
  public categoryName: string;
  public loader: boolean = true;
  public categoryList: NewsCategoryModel[] = [];
  public categoryIdList: number[] = [];
  public index: number;
  public _categoryId: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {



  }
  public async getCategoryName() {
    let catlist: NewsCategoryModel[] = await this.postService.getMenuCategories();
    if (catlist && catlist.length > 0) {
      this.categoryName = catlist.find(list => list.id == parseInt(this._categoryId)).name;
    }
    let url: string = this.router.url;
    if (url.split('/')[1] == 'category') {
      this.postService.scrollTo();
    }

  }

  /**
   * Get posts list by cat id
   */
  public getpostById() {
    this.postList = [];
    this.errorMsg = '';
    this.categoryName = '';
    this.loader = true;
    this.postService.getPost(this._categoryId, this.count)
      .then(data => {
        this.postList = data;
      })
      .catch(err => {
        this.errorMsg = err;
      }).finally(() => {
        this.loader = false;
        this.getCategoryName();
      });
  }


  onScroll(ev: MouseEvent) {
    let ele = <HTMLElement>ev.target;
    let sHeight = ele.scrollHeight;
    let topheight = ele.scrollTop;
    if (!this.loadingPosts && (!!sHeight && !!topheight)) {
      if (topheight >= (sHeight - 700)) {
        this.loadingPosts = true;
        this.loadMorePost();
      }
    }
  }

  public loadMorePost() {
    this.errorMsg = '';
    this.postService.getPost(this._categoryId, 10, this.postList.length + 1)
      .then(data => {
        this.postList.push(...data);
      })
      .catch(err => {
        this.errorMsg = err;
      })
      .finally(() => {
        this.loadingPosts = false;
      })
  }
  public async getMenuCategoryIdList() {
    this.categoryList = await this.postService.getMenuCategories();
    this.categoryIdList = this.categoryList.map(c => c.id);
  }
  onSwipeLeft() {
    let activeId = this.activatedRoute.snapshot.paramMap.get('id');
    let activatedIndex = this.categoryIdList.indexOf(parseInt(activeId));
    if (this.index == 0) {
      let catId = this.categoryIdList[this.index];
      this.router.navigate(['category', catId]);
    }
    else if (activatedIndex == this.categoryIdList.length - 1) {
      this.router.navigate(['category', activeId]);
    }
    else {
      this.index = activatedIndex + 1
      let catId = this.categoryIdList[this.index];
      this.router.navigate(['category', catId]);
    }

  }

  onSwipeRight() {
    let activeId = this.activatedRoute.snapshot.paramMap.get('id');
    let activatedIndex = this.categoryIdList.indexOf(parseInt(activeId));
    if (activatedIndex == 0) {
      this.index = 0;
      this.router.navigateByUrl('/');
    }
    else if (activeId == null) {
      this.router.navigateByUrl('/');
    }
    else {
      this.index = activatedIndex - 1
      let catId = this.categoryIdList[this.index];
      this.router.navigate(['category', catId]);
    }

  }
  private scrollToTop() {
    let main: HTMLDivElement = this.maincontainer.nativeElement;
    if (main) {
      main.scroll({
        top: 0,

      });
    }
  }
  ngOnInit() {
    this.getMenuCategoryIdList();

  }

}
