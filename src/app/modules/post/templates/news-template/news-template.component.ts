import { Component, OnInit, Input } from '@angular/core';
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

  @Input() categoryID: string;
  @Input() count: number;
  @Input() title: string;
  @Input() loadMoreBtn: boolean = false;
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
    this.categoryName = '';
    this.postService.getNewsCategories(parseInt(this.categoryID))
      .then(category => { this.categoryName = category.name; })
      .catch(err => { })
  }
  public getpostById() {
    this.postList = [];
    this.errorMsg = '';
    this.loader = true;
    this.count = typeof this.count === "undefined" ? 10 : this.count;
    this.postService.getPost(this.categoryID, this.count)
      .then(data => { this.postList = data; this.loader = false; })
      .catch(err => { this.errorMsg = err; this.loader = false; });
    window.scroll({
      top: 0,
      // behavior: "smooth"
    });
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
    window.scrollTo({
      left:-22,
    })
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
    window.scrollTo({
      left:22
    })
  }
  ngOnInit() {
    //  this.getMenuCategory();
    this.getMenuCategoryIdList();
  }
  ngOnChanges() {
    this.getpostById();
    this.getCategoryName()
  }

}
