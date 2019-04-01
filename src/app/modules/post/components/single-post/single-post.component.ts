import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';
import { PostModel } from 'src/app/model/post.model';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer, private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getPostSlug();
        this.scrollToTop();
      }
    })
  }

  public getPostSlug() {
    this.postSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (this.postSlug) {
      this.loader = true;
      this.post = null;
      this.ytVideo = false;
      this.errorMsg = '';
      this.getpost()
    }
  }
  public getpost() {

    this.postService.getPostByPostId(this.postSlug, PostTypeEnum.Post)
      .then(postData => {
        this.post = postData;
        if (this.post.categoryList.some(c => c.id === 47)) {
          let Url = this.geturl(this.post.content);
          if (Url) {
            this.trustedUrl(Url)
          }
          this.ytVideo = true;
        }
      })
      .catch(err => { this.errorMsg = err; })
      .finally(() => {

        this.loader = false
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
