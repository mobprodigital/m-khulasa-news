import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { PostModel } from 'src/app/model/post.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public searchTerm: string;
  public postList: PostModel[] = [];
  public loader: boolean = true;
  public errorMsg: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.searchTerm = this.activatedRoute.snapshot.paramMap.get('searchTerm');
        this.getSearchResule();
      }
    })
  }

  public getSearchResule() {
    window.scroll({
      top: 0
    });
    this.loader = true;
    this.postList = [];
    this.errorMsg = '';
    this.postService.getSearchResults(this.searchTerm)
      .then(data => { this.postList = data; })
      .catch(err => { this.errorMsg = err; })
      .finally(() => {
        this.loader = false;
      })
  }
  ngOnInit() {
  }

}
