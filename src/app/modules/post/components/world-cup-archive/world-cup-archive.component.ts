import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';
import { PostModel } from 'src/app/model/post.model';

@Component({
  selector: 'app-world-cup-archive',
  templateUrl: './world-cup-archive.component.html',
  styleUrls: ['./world-cup-archive.component.scss']
})
export class WorldCupArchiveComponent implements OnInit {
  public worldCupPostList: PostModel[] = [];
  public errorMsg = '';
  public loader = true;
  public count: number = 10;
  constructor(private postService: PostService) { }


  public getWorldCuppost() {
    this.worldCupPostList = [];
    this.errorMsg = '';
    this.loader = true;
    this.postService.getWorldCupPost(10, 1, PostTypeEnum.worldCup)
      .then(data => { this.worldCupPostList = data, this.loader = false })
      .catch(err => { this.errorMsg = err,this.loader = false })
  }

  ngOnInit() {
    this.getWorldCuppost()
  }

}
