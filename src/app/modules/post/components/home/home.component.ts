import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { Subscription } from 'rxjs';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public catIdList: number[] = [];
  private langChangeSubscription: Subscription;

  constructor(
    private langSvc: AppLangServiceService
  ) {
    this.catIdList = [42, 43, 48, 41];
    this.langChangeSubscription = this.langSvc.langChangedEmitter.subscribe(
      (lang: AppLangEnum) => {
        this.catIdList = [];
        setTimeout(() => {
          this.catIdList = [42, 43, 48, 41];
        });
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
