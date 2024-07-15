import { Component, Output ,EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyFetchService } from 'src/app/shared/company-fetch-service';


@Component({
  selector: 'app-cp-edit',
  templateUrl: './cp-edit.component.html',
  styleUrls: ['./cp-edit.component.css']
})
export class CpEditComponent {

  @Output() setFalse=new EventEmitter<void>()

  constructor( private cf: CompanyFetchService) {
  }

  @Input() id!:string;
  @Input() started!:string;
  @Input() name!:string;
  @Input() location!:string;

  onCancel()
  {
    this.setFalse.emit();
  }

  onSubmit(form : NgForm)
  {

     const send ={
      companyName:form.value.name,
      companyLocation:form.value.location,
      startedOn:form.value.started
      };

      console.log(this.id);
      const res=this.cf.updateCpy(this.id,send).subscribe(
        (response) => {
          console.log('Update successful:', response);
          window.alert('Company updated successfully'); // Display success message
          this.onCancel(); // Close the dialog or handle success flow
        },
        (error) => {
          console.error('Error updating Company:', error);
          window.alert('Failed to update Company'); // Display error message
          // Optionally handle error flow
        }
      );;
      
      this.onCancel();

  }

  

}
