import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RollsCollection } from 'src/models/characterRolls';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })


  export class ANightstaleApiService {
    baseUrl = 'https://localhost:44369/api/Character/Rolls';
    baseUrlPost = 'https://localhost:44369/api/Character/AngCharacter';
  
    constructor(private httpClient: HttpClient) { }


  
    getAll(): Observable<number[]> {
      const url = `${this.baseUrl}`;
      console.log(`sending request to ${url}`);
      const response = this.httpClient.get<number[]>(url);
      return response.pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
    }

    async postAll(myRolls: number[]=[]): Promise<number[]> {      

      console.log(myRolls);
      const url = `${this.baseUrlPost}`;
      console.log(`sending request to ${url}`);
      const response = await this.httpClient.post(url,myRolls).toPromise();
      console.log('received:');
      console.log(response);
      return myRolls;
    }
  }
