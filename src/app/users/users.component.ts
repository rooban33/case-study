import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { UserFetchService } from '../shared/user-fetch-service';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';


type info={
  Id: string,
  FirstName: string,
  LastName: string,
  InsuredAmount: string,
  CompanyName: string,
  Email: string,
  Location: string
};

@Component({
  selector: 'app-tables',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private usersFetchService: UserFetchService, private router:Router) {}

  colDefs: ColDef[] = [
    { field: 'Id', sortable: true, filter: true },
    { field: 'FirstName', sortable: true, filter: true },
    { field: 'LastName', sortable: true, filter: true },
    { field: 'InsuredAmount', sortable: true, filter: true },
    { field: 'CompanyName', sortable: true, filter: true },
    { field: 'Email', sortable: true, filter: true },
    { field: 'Location', sortable: true, filter: true }
  ];

  rowData: info[] = [];

  addState=false;

  onGet() {
    this.usersFetchService.getData().subscribe(
      (data: any[]) => {
        this.rowData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error as needed, e.g., show error message to user
      }
    );
    console.log(this.rowData);
  }

  check(form: NgForm) {
    console.log(form.value.id);
    const s=this.usersFetchService.checkUser(form.value.id).subscribe(
      (response) => {
        console.log('User Available');
      },
      (error) => {
        console.error('Error');
      }
    );

    
        if (s) {
          
          this.router.navigate(['/user',form.value.id]); 
        } else {
          window.alert("User ID not found");
        }
      }

      onCancel()
      {
        this.addState=false;
      }
    
      onEdit()
      {
        this.addState=true;
      }


}
