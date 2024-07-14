import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyFetchService } from 'src/app/shared/company-fetch-service';

@Component({
  selector: 'app-cmdisplay',
  templateUrl: './cmdisplay.component.html',
  styleUrls: ['./cmdisplay.component.css']
})
export class CmdisplayComponent {
  cpId!: string; 
  info: any; 
  editState=false;

  constructor(private route: ActivatedRoute, private cmf: CompanyFetchService) {}

  ngOnInit() {
    this.cpId = this.route.snapshot.paramMap.get('id')!;

    this.cmf.displayCompany(this.cpId).subscribe(
      (data: any) => {
        this.info = data;
        console.log('Company Info:', this.info); // Log the entire user info object
        console.log('Company ID:', this.info.Id); // Accessing Id property from info
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        // Handle error as needed, e.g., show error message to user
      }
    );
    console.log(this.info);
  }

  onCancel()
  {
    this.editState=false;
  }

  onEdit()
  {
    this.editState=true;
  }
  
}
