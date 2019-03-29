import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostModel } from 'src/app/model/post.model';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.scss']
})
export class NewsTemplateComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) // for window scroll events

  @Input() categoryID: string;
  @Input() count: number = 10;
  @Input() title: string;
  // @Input() loadMore: boolean = true;



  private loadingPosts: boolean = false;
  public postList: PostModel[] = [];
  public errorMsg: string = '';
  public categoryName: string;
  public loader: boolean = true;
  public categoryList: NewsCategoryModel[] = [];
  public categoryIdList: number[] = [];
  public index: number;

  constructor(private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute, private localService: LocalStorageService) {

  }
  public async getCategoryName() {
    // let catlist: NewsCategoryModel[] = JSON.parse(localStorage.getItem('ks_menu_cat'));
    let catlist: NewsCategoryModel[] = await this.postService.getMenuCategories();
    if (catlist && catlist.length > 0) {
      this.categoryName = catlist.find(list => list.id == parseInt(this.categoryID)).name;
    }


  }
  public getpostById() {
    this.postList = [];
    this.errorMsg = '';
    this.categoryName = '';
    this.loader = true;

    this.postService.getPost(this.categoryID, this.count)
      .then(data => {
        this.postList = data;
        this.loader = false;
        this.getCategoryName()
      })
      .catch(err => {
        this.errorMsg = err;
        this.loader = false;
        this.getCategoryName()
      });
    // window.scroll({
    //   top: 0,
    //   // behavior: "smooth"
    // });
  }


  onScroll(ev: MouseEvent) {
    let ele = <HTMLElement>ev.target;
    let sHeight = ele.scrollHeight;
    let topheight = ele.scrollTop;
    if (!this.loadingPosts) {
      if (topheight >= (sHeight - 700)) {
        this.loadingPosts = true;
        this.loadMorePost();

      }
    }
  }

  public loadMorePost() {
    this.errorMsg = '';
    this.postService.getPost(this.categoryID, 10, this.postList.length + 1)
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
    this.postService.scrollTo();
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
    this.postService.scrollTo();
  }


  ngOnInit() {
    //  this.getMenuCategory();
    this.getMenuCategoryIdList();


  }
  ngOnChanges() {
    this.getpostById();

  }
}
