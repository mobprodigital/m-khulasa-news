import { Component, OnInit } from '@angular/core';
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

      }
    })
  }

  public getPostSlug() {
    this.postSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (this.postSlug) {
      this.loader = true;
      this.post = null;
      this.ytVideo = false;
      this.getpost()
    }
  }
  public getpost() {
    this.errorMsg = '';
    this.postService.getPostByPostId(this.postSlug, PostTypeEnum.Post)
      .then(postData => {
        this.post = postData;
        this.loader = false;
        //  this.getAllLink(this.post.content);
        if (this.post.categoryList.some(c => c.id === 47)) {
          let Url = this.geturl(this.post.content);
          if (Url) {
            this.trustedUrl(Url)
          }
          this.ytVideo = true;
        }
      })
      .catch(err => { this.errorMsg = err; this.loader = false })
  }

  // public getAllLink(content: string) {
  //   let tempDiv: HTMLDivElement = document.createElement('div');
  //   tempDiv.innerHTML = content;
  //   let linkList=tempDiv.getAttribute('href');
  //   console.log(linkList)
  // }

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
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }
}
