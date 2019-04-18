import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { ShareToAppComponent } from './components/share-to-app/share-to-app.component';

@NgModule({
  declarations: [NotFoundComponent, AdBannerComponent, ShareToAppComponent],
  imports: [
    CommonModule
  ],
  exports: [NotFoundComponent, AdBannerComponent, ShareToAppComponent]
})
export class SharedModule { }
