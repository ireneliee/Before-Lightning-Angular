import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Promotion } from '../models/promotion';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  baseUrl: string = '/api/Promotion';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  retrieveOngoingPromotion(): Observable<Promotion[]> {
    console.log("===================retrieveOngoingPromotionInService======================");
    return this.httpClient.get<Promotion[]>(this.baseUrl + "/retrieveAllOngoingPromotion").pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occured: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occured: ' + `HTTP${error.status}: ${error.error}`;
    }
    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
