import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatoslistComponent } from './platoslist/platoslist.component';
import { PlatosSearchComponent } from './platos-search/platos-search.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomepageTPVComponent } from './homepage-tpv/homepage-tpv.component';



@NgModule({
  declarations: [
    AppComponent,
    PlatoslistComponent,
    PlatosSearchComponent,
    HomepageComponent,
    ErrorModalComponent,
    HomepageTPVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
