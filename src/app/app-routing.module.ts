import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { HomepageTPVComponent } from './homepage-tpv/homepage-tpv.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: ':hotel', component: HomepageComponent},
  {path: ':hotel/:tpv', component: HomepageTPVComponent},
  {path: '**', component: ErrorModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }