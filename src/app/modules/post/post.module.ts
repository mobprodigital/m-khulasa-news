import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { CommonComponent } from './components/common/common.component';

import { ArchivePostComponent } from './components/archive-post/archive-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [CommonComponent, ArchivePostComponent, SinglePostComponent, HomeComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
