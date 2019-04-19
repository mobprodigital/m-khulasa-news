import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/model/post.model';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';


declare var Android: any;

@Component({
  selector: 'app-share-to-app',
  templateUrl: './share-to-app.component.html',
  styleUrls: ['./share-to-app.component.scss']
})
export class ShareToAppComponent implements OnInit {


  @Input() post: PostModel;

  public shareUrl: string;
  public canShare: boolean = ('share' in navigator) || (typeof Android !== 'undefined');
  constructor(
    private appLangService: AppLangServiceService,
  ) { }

  ngOnInit() {

  }

  public sharePost() {
    if ('share' in navigator) {
      window.navigator['share']({
        title: this.post.title,
        text: this.post.title,
        url: window.location.href + '/' + this.appLangService.selectedAppLang
      }).catch(err => {
        console.log('Share post error : ', err);
      });
    } else if (typeof Android !== 'undefined') {
      if (Android && Android.sharePost) {
        Android.sharePost(window.location.href + '/' + this.appLangService.selectedAppLang);
      }
    } else {

    }
  }


}
