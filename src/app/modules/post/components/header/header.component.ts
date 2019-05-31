import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { Router, NavigationEnd } from '@angular/router';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public categoryList: NewsCategoryModel[] = [];
  public SearchTerm: string = '';
  public translate: string = 'translateX(-250px)';
  public show: boolean = true;
  public langBtn: boolean = true;
  public liHome: string;
  public lang: string;

  public wcCatId: number = 32448;

  @ViewChild('nav') nav: ElementRef;

  constructor(private postService: PostService,
    private router: Router,
    private appLangService: AppLangServiceService,
  ) {
    this.getMenuCategories();
    this.appLangService.langChangedEmitter.subscribe(
      (lang: AppLangEnum) => {
        this.getMenuCategories();
        // this.router.navigateByUrl('/');

        this.wcCatId = lang === AppLangEnum.English ? 32448 : 34860;
      }
    );

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.scrollTo();
        }, 0);
      }

    });

  }

  private getMenuCategories() {
    this.postService.getMenuCategories()
      .then(catlist => {
        this.categoryList.length = 0;
        this.categoryList = catlist;
      });
    this.liHome = this.appLangService.selectedAppLang === AppLangEnum.Hindi ? 'होम' : 'home';
    this.lang = this.appLangService.selectedAppLang === AppLangEnum.Hindi ? 'English' : 'हिंदी';
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
    } else {
      this.translate = 'translateX(-250px)';
      this.show = true;
    }

  }

  public setLanguage() {
    this.appLangService.selectedAppLang =
      this.appLangService.selectedAppLang === AppLangEnum.English ? AppLangEnum.Hindi : AppLangEnum.English;

    this.router.navigateByUrl('/');
  }
  ngOnInit() {
  }

  public scrollTo() {
    const ulHTML: HTMLUListElement = this.nav.nativeElement;
    if (!ulHTML) {
      return;
    }
    let activeTab: HTMLElement = ulHTML.querySelector('.nav-link-active');
    if (!activeTab) {
      return;
    }
    const scrollCount = (activeTab.offsetLeft + (activeTab.clientWidth / 2)) - (ulHTML.clientWidth / 2);
    ulHTML.scrollTo({
      left: scrollCount,
      behavior: "smooth"
    });
  }

}
