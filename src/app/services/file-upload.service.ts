import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class FileUploadService {
	// API url
	baseApiUrl = "C:/glassfish-5.1.0-uploadedfiles/uploadedFiles/";

	constructor(private httpClient: HttpClient) {}

  //NOTHING WORKS UNSURE WHAT TO EVEN DO NEED HELP :()

	// Returns an observable
	upload(file: File, filename: string): Observable<any> {
		// Create form data
		const formData = new FormData();

		// Store form name as "file" with file data
		formData.append(filename, file, file.name);

		// Make http post request over api
		// with formData as req
		return this.httpClient.post(this.baseApiUrl, formData);
	}

	// uploadFile(file: File): Observable<any> {
	// 	console.log("======HERE IN FILE UPLOAD SERVICE =====");

	// 	return this.httpClient.put<File>(this.baseUrl, createNewMemberReq, httpOptions).pipe(catchError(this.handleError));
	// }

	private handleError(error: HttpErrorResponse) {
		let errorMessage: string = "";

		if (error.error instanceof ErrorEvent) {
			errorMessage = "An unknown error has occurred: " + error.error;
		} else {
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
		}

		console.error(errorMessage);

		return throwError(() => new Error(errorMessage));
	}
}
