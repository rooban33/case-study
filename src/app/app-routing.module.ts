import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CompanyComponent } from './company/company.component';
import { UserdisplayComponent } from './users/userdisplay/userdisplay.component';
import { CmdisplayComponent } from './company/cmdisplay/cmdisplay.component';
const routes: Routes = [
  {
    path:"users",component:UsersComponent
  },
  {
    path:"company",component:CompanyComponent
  },
  {
    path:"user/:id",component:UserdisplayComponent
  },
  {
    path:"company/:id",component:CmdisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
