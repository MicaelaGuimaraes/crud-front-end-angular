import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
})
export class UserService {
    token = localStorage.getItem("jwt");
    api = environment.api;
    User = 'User/'

    constructor(
        private http: HttpClient,
    ) { }

    post(data: any) {
        return this.http.post(this.api + this.User, data, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
    }

    getAll(): Observable<Object> {
        return this.http.get(this.api + this.User, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
    }

    getById(id: any): Observable<Object> {
        return this.http.get(this.api + this.User + id, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
    }

    put(id: any, data: Object): Observable<Object> {
        return this.http.put(this.api + this.User + id, data, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
    }

    delete(id: any): Observable<Object> {
        return this.http.delete(this.api + this.User + id, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
    }
}
