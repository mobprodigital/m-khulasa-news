import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';
import { PostModel } from 'src/app/model/post.model';

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
  public loader: boolean = true
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getPostSlug()
      }
    })
  }

  public getPostSlug() {

    this.postSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (this.postSlug) {
      this.loader = true;
      this.post = null;
      this.getpost()
    }
  }
  public getpost() {

    this.errorMsg = '';
    window.scroll({
      top: 0,
      // behavior: "smooth"
    });
    this.postService.getPostByPostId(this.postSlug, PostTypeEnum.Post)
      .then(postData => { this.post = postData; this.loader = false })
      .catch(err => { this.errorMsg = err; this.loader = false })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }

}
