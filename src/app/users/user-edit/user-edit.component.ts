import { Component, Output ,EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserFetchService } from 'src/app/shared/user-fetch-service';

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

  constructor( private usf: UserFetchService) {}

  @Input() id!:string;

  onCancel()
  {
    this.setFalse.emit();
  }

  onSubmit(form : NgForm)
  {

     const send : info ={
      firstname:form.value.firstname,
      avatar:form.value.avatar,
      lastname:form.value.lastname
      };

      console.log(this.id);
      const res=this.usf.updateUser(this.id,send);
      window.alert(res);
      this.onCancel();

  }

}
