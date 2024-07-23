import { Component, EventEmitter } from '@angular/core';
import { ColDef,GridApi , GridReadyEvent } from 'ag-grid-community';
import { UserFetchService } from '../shared/user-fetch.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterComponent } from './filter.component';






type info={
  Id: string,
  FirstName: string,
  LastName: string,
  InsuredAmount: string,
  CompanyName: string,
  Email: string,
  Location: string
};

interface RowStyle {
  [style: string]: string;
}


@Component({
  selector: 'app-tables',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  currCycleOnlyShowBlankOption: boolean = false;
  currCycleOnlyShowFilledOption: boolean = false;
  gridId: number = 1;
  factVendorDiscountHash: info[] = [];
  old!:string;
  private gridApi!: GridApi;
  private printApi!:GridApi;
  first=0;

  constructor(private usersFetchService: UserFetchService, private router:Router) {
  }

  header_template = `
<span class="text-danger" style="height:30px;">
  Some Value<br>
  <div>
  <input type="checkbox" [(ngModel)]="currCycleOnlyShowBlankOption"
         (change)="currCycleOnlyShowBlankOption!=currCycleOnlyShowBlankOption;filterCurrentView($event)"
         style="font-size: 10px;">
  <span style="font-size: 12px;">Unassigned</span>
  <input type="checkbox" [(ngModel)]="currCycleOnlyShowFilledOption"
         (change)="currCycleOnlyShowFilledOption!=currCycleOnlyShowFilledOption;filterCurrentView($event)"
         style="font-size: 10px;">
  <span style="font-size: 12px;">Assigned</span>
  </div>
</span>
`;



  colDefs: ColDef[] = [
    {
      headerComponent: FilterComponent,
      initialWidth:250,
      field: 'Id', 
      sortable: false, 
      filter: true ,
       lockPosition:true},
    { field: 'FirstName', sortable: true, filter: true },
    { field: 'LastName', sortable: true, filter: true },
    { field: 'InsuredAmount', sortable: true, filter: true,editable:true },
    { field: 'CompanyName', sortable: true, filter: true },
    { field: 'Email', sortable: true, filter: true,wrapText:true,autoHeight:true,resizable:true },
    { field: 'Location', sortable: true, filter: true }
  ];
  



getRowStyle = (params: any) => {
  const newData = params.data.InsuredAmount;
  const oldData = this.getInsuredAmountById(String(params.data.Id));
  console.log("Old InsuredAmount:", oldData);
  console.log("New InsuredAmount:", newData);
  

  if (newData !== oldData) {
    console.log("InsuredAmount changed");
    return { 'background-color': 'cadetblue' }; 
  } else {
      return { 'background-color': '#1E1E1E' };
    
    }
    }

    ngOnInit() {
      this.onGet();
    }
    
    

  


  isExternalFilterPresent(): boolean {
    this.currCycleOnlyShowBlankOption=false;
    console.log(this.currCycleOnlyShowBlankOption);
    return true;
  }

  doesExternalFilterPass(node: any): boolean {
    // Perform filtering logic
    
  
    // Return true if node passes the external filter
    // Modify this based on your specific logic if you need to check against node properties
    return true;
  }

  showBlankEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  showFilledEventEmitter: EventEmitter<any> = new EventEmitter<any>();


  showBlankOption = () => {
    if (this.currCycleOnlyShowBlankOption) {
      this.showBlankEventEmitter.emit({
        gridId: this.gridId,
        data: [
          {
            key: "insuredAmount",
            data: {
              values: Object.entries(this.factVendorDiscountHash)
                .filter(([key, value]: any) => key ==="1000")
                .map(([key]) => key)
                .slice(0, -1),
              filterType: "set",
            },
          },
        ],
      });
    } else {
      this.showBlankEventEmitter.emit({
        gridId: this.gridId,
        data: "null",
      });
    }
  };
  showFilledOption = () => {
    if (this.currCycleOnlyShowFilledOption) {
      this.showFilledEventEmitter.emit({
        gridId: this.gridId,
        data: [
          {
            key: "insuredAmount",
            data: {
              values: Object.entries(this.factVendorDiscountHash)
                .filter(([key, value]: any) => value !== "1000"),
              filterType: "set",
            },
          },
        ],
      });
    } else {
      this.showFilledEventEmitter.emit({
        gridId: this.gridId,
        data: "null",
      });
    }
  };
  rowData: info[] = [];

  addState=false;

  onGet() {
    this.usersFetchService.getData().subscribe(
      (data: any[]) => {
        this.rowData = data;
        this.factVendorDiscountHash=data;
        this.old=JSON.stringify(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error as needed, e.g., show error message to user
      }
    );
    console.log(this.rowData);
  }

  filterCurrentView(e:Event) {
    // Call appropriate method to apply filters based on current options
    console.log("i've been called");
    if (this.currCycleOnlyShowBlankOption) {
      this.showBlankOption();
    } 
     if (this.currCycleOnlyShowFilledOption) {
      this.showFilledOption();
    } 
  }

   getInsuredAmountById(id: string): string | undefined {
    const parsedOldData = JSON.parse(this.old) as info[];
  const user = parsedOldData.find(info => info.Id === id);
  return user ? user.InsuredAmount : undefined;
  }
  

  check(form: NgForm) {
    console.log(form.value.id);
    const s=this.usersFetchService.checkUser(form.value.id).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/user',form.value.id]); 
        } else {
          window.alert("User ID not found");
        }
      }
    );

    
      }

      onCancel()
      {
        this.addState=false;
      }
    
      onEdit()
      {
        this.addState=true;
      }

      gridOptions={
        pagination: true,
        paginationPageSize: 10,
      }

     

      onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        console.log(this.gridApi);
        
      }

      onBtExport(): void {
        this.gridApi!.exportDataAsCsv({
          exportedRows: "all",
          fileName:"AllData"
        });
      }

      

}
