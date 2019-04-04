import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';

@NgModule({
  declarations: [NotFoundComponent, AdBannerComponent],
  imports: [
    CommonModule
  ],
  exports: [NotFoundComponent, AdBannerComponent]
})
export class SharedModule { }
