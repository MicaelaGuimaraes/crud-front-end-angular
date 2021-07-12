import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
})
export class UserService {

    api = environment.api;
    User = 'User/'

    constructor(
        private http: HttpClient,
    ) { }

    post(data: Object): Observable<Object> {
        return this.http.post<Object>(this.api + this.User, data).pipe(
            map(obj => obj)
        )
    }

    getAll(): Observable<Object> {
        return this.http.get(this.api + this.User).pipe(
            map(obj => obj),
        )
    }

    getById(id: any): Observable<Object> {
        return this.http.get(this.api + this.User + id).pipe(
            map(obj => obj),
        )
    }

    put(id: any, data: Object): Observable<Object> {
        return this.http.put(this.api + this.User + id, data).pipe(
            map(obj => obj),
        )
    }

    delete(id: any): Observable<Object> {
        return this.http.delete(this.api + this.User + id).pipe(
            map(obj => obj),
        )
    }
}
