import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PlatosSearchComponent } from './platos-search/platos-search.component';
import { PlatoslistComponent } from './platoslist/platoslist.component';


const routes: Routes = [
  {path: ':hotel', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
