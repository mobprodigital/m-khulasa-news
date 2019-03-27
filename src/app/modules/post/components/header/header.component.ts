import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public categoryList: NewsCategoryModel[];
  public SearchTerm: string = '';
  public translate: string = 'translateX(-250px)';
  public show: boolean = true;
  public langBtn: boolean = true;
  public lang: string;

  constructor(private postService: PostService, private router: Router) {
    this.postService.getMenuCategories()
      .then(catlist => {
      this.categoryList = catlist;
        // setTimeout(() => {
        //   this.postService.scrollTo()
        // }, 100);
      })
    this.lang = localStorage.getItem('lang');
  }
  public search() {
    if (this.SearchTerm && this.SearchTerm.trim()) {
      this.router.navigate(['search', this.SearchTerm]);
    }
  }
  public sideNav() {
    if (this.translate == 'translateX(-250px)') {
      this.translate = 'translateX(0px)';
      this.show = false;
    }
    else {
      this.translate = 'translateX(-250px)'
      this.show = true;
    }

  }

  public setLanguage() {
    if (localStorage.getItem('lang') == 'hin') {
      localStorage.setItem('lang', 'eng');
      this.router.navigate(['/']);
      setTimeout(() => {
        location.reload();
      }, 100);
    }
    else {
      localStorage.setItem('lang', 'hin');
      this.router.navigate(['/']);
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  }
  ngOnInit() {
  }
}
