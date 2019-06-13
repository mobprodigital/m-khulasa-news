import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'wc',
    loadChildren: "src/app/modules/wc-2019/wc-2019.module#Wc2019Module"
  }, {
    path: '',
    loadChildren: 'src/app/modules/post/post.module#PostModule'
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
