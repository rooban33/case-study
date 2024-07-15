import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyFetchService } from 'src/app/shared/company-fetch-service';

@Component({
  selector: 'app-cpadd',
  templateUrl: './cpadd.component.html',
  styleUrls: ['./cpadd.component.css']
})
export class CpaddComponent {

  @Output() setFalse=new EventEmitter<void>()

  constructor( private cmf: CompanyFetchService) {
  }



  onCancel()
  {
    this.setFalse.emit();
  }

  onSubmit(form : NgForm)
  {

     const send ={
      companyName:form.value.name,
      startedOn:form.value.startedOn,
      companyLocation:form.value.location
      };

      console.log(send);
      const res=this.cmf.addCpy(send).subscribe(
        (response) => {
          console.log('Added successfully:', response);
          window.alert('Company Added successfully'); // Display success message
          this.onCancel(); // Close the dialog or handle success flow
        },
        (error) => {
          console.error('Error Adding Company:', error);
          window.alert('Failed to add company'); // Display error message
          // Optionally handle error flow
        }
      );
      this.onCancel();

  }


}
