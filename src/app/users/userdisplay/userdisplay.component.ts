import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFetchService } from 'src/app/shared/user-fetch-service';

@Component({
  selector: 'app-user-details',
  templateUrl: './userdisplay.component.html',
  styleUrls: ['./userdisplay.component.css']
})
export class UserdisplayComponent implements OnInit {
  
  userId!: string; // Assuming userId will be assigned before ngOnInit completes
  info: any; // Assuming info will hold the fetched user data
  editState=false;

  constructor(private route: ActivatedRoute, private usf: UserFetchService) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.usf.displayUser(this.userId).subscribe(
      (data: any) => {
        this.info = data;
        console.log('User Info:', this.info); // Log the entire user info object
        console.log('User ID:', this.info.Id); // Accessing Id property from info
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        // Handle error as needed, e.g., show error message to user
      }
    );
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
