import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { forkJoin, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

type info={
    Id: string,
    FirstName: string,
    LastName: string,
    InsuredAmount: string,
    CompanyName: string,
    Email: string,
    Location: string
  };



@Injectable()
export class UserFetchService {


    constructor(private http: HttpClient) { }

    private apiUrl = 'https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users';


         assignData(data: info[]): any[] {

            //console.log(data);
            const ans: any[] = data.map((item: any) => ({
              Id: item.id,
              FirstName: item.firstName,
              LastName: item.lastName,
              InsuredAmount: item.insuredAmount,
              CompanyName: item.companyName,
              Email: item.email,
              Location: item.userLocation
            }));
          
            //console.log(ans); // Log the transformed data for verification or debugging
          
            return ans;
          }



    getData(): Observable<any> {
        return this.http.get('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users')
          .pipe(
            map((data: any) => this.assignData(data)),
            catchError(this.handleError)
          );
      }

    private handleError(error: any) {
        console.error('API Error:', error); // log to console instead
        return throwError('Error fetching data from API. Please try again later.');
    }

    checkUser(id: string): boolean {
        const data = this.http.get<string>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users/' + id).pipe(
            map((data: any) => ({
              Id: data.id,
              FirstName: data.firstName,
              LastName: data.lastName,
              InsuredAmount: data.insuredAmount,
              CompanyName: data.companyName,
              Email: data.email,
              Location: data.userLocation,
              Avatar: data.avatar
            })),
            catchError(this.handleError));
            console.log(data);
          return true;
      }

    displayUser(id: string): Observable<any> {
        return this.http.get('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users/' + id)
          .pipe(
            map((data: any) => ({
              Id: data.id,
              FirstName: data.firstName,
              LastName: data.lastName,
              InsuredAmount: data.insuredAmount,
              CompanyName: data.companyName,
              Email: data.email,
              Location: data.userLocation,
              Avatar: data.avatar
            })),
            catchError(this.handleError)
          );
      }

      updateUser(id: string, userData: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
        console.log('Updating user with data:', userData);
      
        return this.http.put<any>(url, userData, { headers }).pipe(
            catchError(error => {
              console.error('Error updating user:', error);
              return throwError(error);
            }),
            tap(response => {
              console.log('Update user response:', response);
            })
        );
      }
      

    
}
