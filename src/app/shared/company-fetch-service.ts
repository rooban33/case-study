import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { forkJoin, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

type info={
    Id: string,
    Name: string,
    Location: string
    Started:string
  };

@Injectable()
export class CompanyFetchService {


    private apiUrl = 'https://63ad81dada81ba97619ef936.mockapi.io/api/v1/company';



    

    constructor(private http: HttpClient) { }


         assignData(data: info[]): any[] {

            //console.log(data);
            const ans: any[] = data.map((item: any) => ({
              Id: item.id,
              Name: item.companyName,
              Location: item.companyLocation
            }));
          
            //console.log(ans); // Log the transformed data for verification or debugging
          
            return ans;
          }



    getData(): Observable<any> {
        return this.http.get('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/company')
          .pipe(
            map((data: any) => this.assignData(data)),
            catchError(this.handleError)
          );
      }

    private handleError(error: any) {
        console.error('API Error:', error); // log to console instead
        return throwError('Error fetching data from API. Please try again later.');
    }

    checkcp(id: string): boolean {
        const data = this.http.get<string>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/company/' + id).pipe(
            map((data: any) => ({
              Id: data.id,
              Name: data.companyName,
              Location: data.companyLocation,
              Started: data.startedOn
            })),
            catchError(this.handleError));
            console.log(data);
          return true;
      }

      displayCompany(id: string): Observable<info> {
        return this.http.get<any>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/company/'+id)
          .pipe(
            map((data: any) => ({
              Id: data.id,
              Name: data.companyName,
              Location: data.companyLocation,
              Started: data.startedOn
            })),
            catchError(this.handleError)
          );
      }

      updateCpy(id: string, userData: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
        console.log('Updating Company with data:', userData);
      
        return this.http.put<any>(url, userData, { headers }).pipe(
            catchError(error => {
              console.error('Error updating Company:', error);
              return throwError(error);
            }),
            tap(response => {
              console.log('Update Company response:', response);
            })
        );
      }


      addCpy(data:any): Observable<any>
      {
        console.log("hERE:",data);
        return this.http.post<any>(this.apiUrl, data);
      }


      deleteCpy(id: string): Observable<any> {
        return this.http.delete<any>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users/' + id);
      }
    
}
