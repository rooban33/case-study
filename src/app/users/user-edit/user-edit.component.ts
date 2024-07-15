import { Component, Output ,EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserFetchService } from 'src/app/shared/user-fetch.service';

type info={
  firstname:string,
  avatar:string,
  lastname:string
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  @Output() setFalse=new EventEmitter<void>()

  constructor( private usf: UserFetchService) {
  }

  @Input() id!:string;
  @Input() first!:string;
  @Input() avatar!:string;
  @Input() last!:string;

  onCancel()
  {
    this.setFalse.emit();
  }

  onSubmit(form: NgForm) {
    const send: info = {
      firstname: form.value.firstname,
      avatar: form.value.avatar,
      lastname: form.value.lastname
    };
  
    console.log(this.id);
    this.usf.updateUser(this.id, send).subscribe(
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
  }
  

}
