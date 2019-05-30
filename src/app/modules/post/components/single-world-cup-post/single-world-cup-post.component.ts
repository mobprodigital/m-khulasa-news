import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostModel } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';

@Component({
  selector: 'app-single-world-cup-post',
  templateUrl: './single-world-cup-post.component.html',
  styleUrls: ['./single-world-cup-post.component.scss']
})
export class SingleWorldCupPostComponent implements OnInit {
  public postSlug: string;
  private routerSubscribe: Subscription;
  public post: PostModel;
  public errorMsg: string = "";
  public loader: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private postServivce: PostService) {
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
      this.errorMsg = '';
      this.post = null;
      this.getPostBySlug();
    }
  }
  public getPostBySlug() {
    this.postServivce.getPostByPostId(this.postSlug, PostTypeEnum.worldCup)
      .then(data => { this.post = data; this.loader = false })
      .catch(err => {this.errorMsg = err; this.loader = false})

  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }
}
