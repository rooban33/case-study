import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserFetchService } from './shared/user-fetch-service';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CompanyComponent } from './company/company.component';
import { CompanyFetchService } from './shared/company-fetch-service';
import { FormsModule } from '@angular/forms';
import { UserdisplayComponent } from './users/userdisplay/userdisplay.component';
import { RouterModule } from '@angular/router';
import { CmdisplayComponent } from './company/cmdisplay/cmdisplay.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { CpEditComponent } from './company/cp-edit/cp-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CompanyComponent,
    UserdisplayComponent,
    CmdisplayComponent,
    UserEditComponent,
    AddUserComponent,
    CpEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
    RouterModule
  ],
  providers: [UserFetchService,CompanyFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
