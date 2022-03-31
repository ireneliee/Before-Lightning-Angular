// import { Injectable } from "@angular/core";
// import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
// import { catchError, Observable, throwError } from "rxjs";
// @Injectable({
// 	providedIn: "root",
// })
// const httpOptions = {
// 	headers: new HttpHeaders({ "Content-Type": "application/json" }),
// };
// export class FileUploadService {
// 	baseUrl: string = "/api/uploadedFiles";
// 	constructor(private httpClient: HttpClient) {}

// 	uploadFile(file: FormData): Observable<any> {
// 		console.log("======HERE IN UPLOAD SERVICE =====");

// 		return this.httpClient.put<any>(this.baseUrl, file, httpOptions).pipe(catchError(this.handleError));
// 	}

// 	private handleError(error: HttpErrorResponse) {
// 		let errorMessage: string = "";

// 		if (error.error instanceof ErrorEvent) {
// 			errorMessage = "An unknown error has occurred: " + error.error;
// 		} else {
// 			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
// 		}

// 		console.error(errorMessage);

// 		return throwError(() => new Error(errorMessage));
// 	}
// }
