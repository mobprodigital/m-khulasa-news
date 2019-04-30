import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';
import { PostModel } from 'src/app/model/post.model';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @ViewChild('singlepostcontainer') maincontainer: ElementRef;

  private routerSubscribe: Subscription;
  public postSlug: string;
  public post: PostModel;
  
  public errorMsg: string = "";
  public loader: boolean = true;
  public ytVideo: boolean = false;
  public youTubeUrl: SafeResourceUrl;
  public relatedPostList: PostModel[] = [];
  public relatedPostError: string = '';
  public relatedPostLoader: boolean = true;
  @ViewChild('postContent') postContent: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private appLangService: AppLangServiceService
  ) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getPostSlug();
        this.scrollToTop();
      }
    })
  }

  public getPostSlug() {
    this.postSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    const lang = this.activatedRoute.snapshot.paramMap.get('lang');
    if (lang && (this.appLangService.selectedAppLang !== lang)) {
      this.appLangService.selectedAppLang = lang === AppLangEnum.English ? AppLangEnum.English : AppLangEnum.Hindi;
      window.location.reload();
    }
    if (this.postSlug) {
      this.loader = true;
      this.post = null;
      this.ytVideo = false;
      this.errorMsg = '';

      this.getpost();
    }
  }
  public getRelatedPost() {
    this.relatedPostLoader = true;
    this.relatedPostList = [];
    this.relatedPostError = '';
    this.postService.getRelatedPostByPostId(this.post.id.toString())
      .then(relatedpost => { this.relatedPostList = relatedpost })
      .catch(err => this.relatedPostError = err)
      .finally(() => { this.relatedPostLoader = false });
  }

  public getpost() {

    this.postService.getPostByPostId(this.postSlug, PostTypeEnum.Post)
      .then(postData => {
        if (postData) {
          this.post = postData;
          if (this.post.categoryList.some(c => c.id === 47)) {
            let Url = this.geturl(this.post.content);
            if (Url) {
              this.trustedUrl(Url)
            }
            this.ytVideo = true;
          }
          this.getRelatedPost();
        }
      })
      .catch(err => {
        this.errorMsg = err;
        this.relatedPostLoader = false;
        this.relatedPostError = 'something went worng'
      })
      .finally(() => {

        this.loader = false;
        // setTimeout(() => {
        //   let contant: HTMLElement = this.postContent.nativeElement;
        //   let aTagList = contant.querySelectorAll('a')
        //   let href = (aTagList[1].getAttribute('href'))
        //   let slug = href.split('/')[3]
        //   console.log(slug)


        // }, 2000);

      })
  }


  private trustedUrl(url) {
    this.youTubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private geturl(iframeString: string): string | null {
    let tempDiv: HTMLDivElement = document.createElement('div');
    tempDiv.innerHTML = iframeString;
    let ytIframe: HTMLIFrameElement = tempDiv.querySelector('iframe');
    if (ytIframe) {
      return ytIframe.src;
    }
    else {
      return null;
    }
  }

  private scrollToTop() {
    let main: HTMLDivElement = this.maincontainer.nativeElement;
    if (main) {
      main.scroll({
        top: 0,
        //  behavior: "smooth"
      });
    }
  }
  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }


}
