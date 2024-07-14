import { Component, Output ,EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyFetchService } from 'src/app/shared/company-fetch-service';

type info={
  name:string,
  location:string,
  started:string
}

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

     const send : info ={
      name:form.value.name,
      location:form.value.location,
      started:form.value.started
      };

      console.log(this.id);
      const res=this.cf.updateUser(this.id,send);
      window.alert(res);
      this.onCancel();

  }

  

}
