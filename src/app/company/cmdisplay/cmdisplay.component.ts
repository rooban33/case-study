import { Component } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { CompanyFetchService } from 'src/app/shared/company-fetch.service';

@Component({
  selector: 'app-cmdisplay',
  templateUrl: './cmdisplay.component.html',
  styleUrls: ['./cmdisplay.component.css']
})
export class CmdisplayComponent {
  cpId!: string; 
  info: any; 
  editState=false;

  constructor(private route: ActivatedRoute, private cmf: CompanyFetchService,private router :Router) {}

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

  onDelete()
  {
    this.cmf.deleteCpy(this.cpId).subscribe(
      (response) => {
        console.log('Delete successful:', response);
        window.alert('Company Deleted successfully'); // Display success message
        this.onCancel(); // Close the dialog or handle success flow
        this.router.navigate(['/company'])
      },
      (error) => {
        console.error('Error deleteing Company:', error);
        window.alert('Failed to delete Company'); // Display error message
        // Optionally handle error flow
      }
    );


  }
  
}
