import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { NewsCategoryModel } from 'src/app/model/newsCategory.model';
import { Router, NavigationEnd } from '@angular/router';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';
import { HttpClient } from '@angular/common/http';
import { FixtureModel } from 'src/app/modules/wc-2019/model/fixture.model';
import { Wc2019Service } from 'src/app/modules/wc-2019/service/wc-2019.service';

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
  public localTeam;
  public visitarTeam;

  public wcCatId: number = 32448;
  public liveScore: string;

  public worldCupFixtures;
  public worldCupNews;
  public worldCupPointTable;

  public liveFixtures: FixtureModel[] = [];
  private liveFixTimer: any;
  public timer;

  @ViewChild('nav') nav: ElementRef;


  constructor(private postService: PostService,
    private router: Router,
    private httpClient: HttpClient,
    private wcCupService: Wc2019Service,
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

    this.getLiveFixes();

    this.timer = setInterval(() => {
      this.getLiveFixes();

    }, 20000);

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
    this.worldCupFixtures = this.appLangService.selectedAppLang === AppLangEnum.Hindi ? 'फिक्सट्यूर्स' : 'Fixtures';
    this.worldCupNews = this.appLangService.selectedAppLang === AppLangEnum.Hindi ? 'वर्ल्ड कप की खबरे' : 'World Cup News';
    this.worldCupPointTable = this.appLangService.selectedAppLang === AppLangEnum.Hindi ? 'पॉइंट्स टेबल' : 'Point Table';

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
    // this.getScoreCard();
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


  public getLiveFixes() {
    this.wcCupService.getLiveFixtures().then(liveFix => {
      this.liveFixtures = liveFix;
      if (this.liveFixtures[0].status === "Finished" || this.liveFixtures[0].status === "NS" || this.liveFixtures[0].status === "Aban" || this.liveFixtures[0].status === 'Cancl') {
        if (this.timer) {
          window.clearInterval(this.timer)
        }
      }
    }).catch(err => {
      console.log(err)
      if (this.timer) {
        window.clearInterval(this.timer)
      }
    });
  }

  public getTeamRun(teamId: number, fixId: number) {
    const currentFix: FixtureModel = this.liveFixtures.find(f => f.id === fixId);
    let score = '0/0 (0)';
    if (currentFix) {
      if (currentFix.runs && currentFix.runs.length > 0) {
        const run = currentFix.runs.find(r => r.team_id === teamId);
        if (run) {
          score = '';
          score += run.score ? run.score.toString() : '0';
          score += (run.wickets ? '/' + run.wickets.toString() : '/0');
          score += (run.overs ? '(' + run.overs + ')' : '(0)');
        }
      }
    }
    return score;
  }

}
