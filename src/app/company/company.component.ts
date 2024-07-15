import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CompanyFetchService } from '../shared/company-fetch-service';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';



type info={
  Id: string,
  Name: string,
  Location: string
};

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  constructor(private cmpnyFetchService: CompanyFetchService,private router:Router) {}

  colDefs: ColDef[] = [
    { field: 'Id', sortable: true, filter: true },
    { field: 'Name', sortable: true, filter: true },
    { field: 'Location', sortable: true, filter: true }
  ];


  rowData: info[] = [];
  addState=false;

  onGet() {
    this.cmpnyFetchService.getData().subscribe(
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
    const s=this.cmpnyFetchService.checkcp(form.value.id)

    
        if (s) {
          
          this.router.navigate(['/company',form.value.id]); 
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
