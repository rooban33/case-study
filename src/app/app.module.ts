import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserFetchService } from './shared/user-fetch.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CompanyComponent } from './company/company.component';
import { CompanyFetchService } from './shared/company-fetch.service';
import { FormsModule } from '@angular/forms';
import { UserdisplayComponent } from './users/userdisplay/userdisplay.component';
import { RouterModule } from '@angular/router';
import { CmdisplayComponent } from './company/cmdisplay/cmdisplay.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { CpEditComponent } from './company/cp-edit/cp-edit.component';
import { CpaddComponent } from './company/cpadd/cpadd.component';
import { SpinnerComponent } from './spinner/spinner.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './shared/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CompanyComponent,
    UserdisplayComponent,
    CmdisplayComponent,
    UserEditComponent,
    AddUserComponent,
    CpEditComponent,
    CpaddComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  providers: [UserFetchService,CompanyFetchService,LoaderInterceptor,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
