import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { CommonComponent } from './components/common/common.component';

import { ArchivePostComponent } from './components/archive-post/archive-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsTemplateComponent } from './templates/news-template/news-template.component';
import { LoaderComponent } from './templates/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleLoaderComponent } from './templates/single-loader/single-loader.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SinglePageComponent } from './components/single-page/single-page.component'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CommonComponent, ArchivePostComponent, SinglePostComponent, HomeComponent, FooterComponent, HeaderComponent, NewsTemplateComponent, LoaderComponent, SingleLoaderComponent, SearchResultsComponent, SinglePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
