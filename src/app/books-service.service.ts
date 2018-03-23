import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BooksService {
  private url = 'https://gist.githubusercontent.com/finizen/6f5d574cec11112342c552fe6fa64a8a/raw/68c755db1a3c255edc258b54176b98bb2b2e8d49' +
    '/booksV1.json';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http
      .get<any>(this.url)
      .pipe(catchError(this.handleError('getBooks', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
