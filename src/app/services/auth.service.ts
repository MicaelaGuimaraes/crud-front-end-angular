import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
})
export class AuthService {

    api = environment.api;
    Auth = 'Auth/'

    constructor(
        private http: HttpClient,
    ) { }

    login(data: string): Observable<Object> {
        return this.http.post(this.api + this.Auth, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        })
    }
}
