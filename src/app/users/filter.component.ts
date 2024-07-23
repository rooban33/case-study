import { Component, EventEmitter ,ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IHeaderAngularComp } from '@ag-grid-community/angular';
import { IHeaderParams } from '@ag-grid-community/core';
import { NgClass } from '@angular/common';


export interface ICustomHeaderParams {
    menuIcon: string;
}

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
  selector: 'filter-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
   <div class="ag-cell-label-container" role="presentation">
      <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
       <div ref="eLabel" class="ag-header-cell-label" role="presentation">
          <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
          <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>
          <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>
          <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>
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
  <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
</span>
       </div>
   </div>
  `
})
export class FilterComponent  {
    currCycleOnlyShowBlankOption: boolean = false;
    currCycleOnlyShowFilledOption: boolean = false;
    gridId: number = 1;
    factVendorDiscountHash: info[] = [];

    showBlankEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  showFilledEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  public params!: IHeaderParams & ICustomHeaderParams;




  agInit(params: IHeaderParams & ICustomHeaderParams): void {
    this.params = params;

}


  showBlankOption = () => {
    if (this.currCycleOnlyShowBlankOption) {
      console.log("Show Blank");
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
                .filter(([key, value]: any) => value !== ""),
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
  
}