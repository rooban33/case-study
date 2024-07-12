import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

type info={
    Id: string,
    Name: string,
    Location: string
    Started:string
  };

@Injectable()
export class CompanyFetchService {

    key: string = 'UITQOD983GZOA3KG';

    key2:string ='LGQJ2M335WOIRHZI'

    ans?:info;


    

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
        const data = this.http.get<string>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users/' + id).pipe(
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

    
}
