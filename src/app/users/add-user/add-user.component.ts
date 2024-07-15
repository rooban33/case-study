import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserFetchService } from 'src/app/shared/user-fetch.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  @Output() setFalse=new EventEmitter<void>()

  constructor( private usf: UserFetchService) {
  }



  onCancel()
  {
    this.setFalse.emit();
  }

  onSubmit(form : NgForm)
  {

     const send ={
      firstName:form.value.firstname,
      avatar:form.value.avatar,
      lastName:form.value.lastname,
      insuredAmount:form.value.amnt,
      companyName:form.value.cmpny,
      email:form.value.email,
      userLocation:form.value.location
      };

      console.log(send);
      const res=this.usf.addUser(send).subscribe(
        (response) => {
          console.log('Update successful:', response);
          window.alert('User updated successfully'); // Display success message
          this.onCancel(); // Close the dialog or handle success flow
        },
        (error) => {
          console.error('Error updating user:', error);
          window.alert('Failed to update user'); // Display error message
          // Optionally handle error flow
        }
      );
      this.onCancel();

  }

}
