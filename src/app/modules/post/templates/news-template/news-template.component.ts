import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostModel } from 'src/app/model/post.model';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.scss']
})
export class NewsTemplateComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) // for window scroll events

  @Input() categoryID: string;
  @Input() count: number;
  @Input() title: string;

  public postList: PostModel[] = [];
  public errorMsg: string = '';
  public categoryName: string;
  public loader: boolean = true;
  public loadMoerLoader: boolean = false;
  public categoryList: NewsCategoryModel[] = [];
  public categoryIdList: number[] = [];
  public index: number;

  constructor(private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  public getCategoryName() {

    let catlist: NewsCategoryModel[] = JSON.parse(localStorage.getItem('ks_menu_cat'));
    this.categoryName = catlist.find(list => list.id == parseInt(this.categoryID)).name;
  }
  public getpostById() {
    this.postList = [];
    this.errorMsg = '';
    this.categoryName = '';
    this.loader = true;
    this.count = typeof this.count === "undefined" ? 10 : this.count;
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
  onScroll() {
    let ele = document.querySelector('#scroll');
    let cHeight = ele.scrollHeight;
    let topheight = ele.scrollTop;
    if (topheight >= (cHeight - 600)) {
      this.loadMorePost();
    }

  }

  public loadMorePost() {
    this.loadMoerLoader = true;
    this.errorMsg = '';

    this.postService.getPost(this.categoryID, 10, this.postList.length + 1)
      .then(data => {
        this.postList.push(...data);
        this.loadMoerLoader = false;
      })
      .catch(err => {
        this.errorMsg = err;
        this.loadMoerLoader = false;
      })
  }
  // public getMenuCategory() {
  //   // this.categoryList = JSON.parse(localStorage.getItem('ks_menu_cat'));
  //   // this.getMenuCategoryIdList();
  //   this.postService.getMenuCategories().then(data => { this.categoryList = data; this.getMenuCategoryIdList() }).catch()
  // }
  public getMenuCategoryIdList() {
    this.categoryList = JSON.parse(localStorage.getItem('ks_menu_cat'));
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
