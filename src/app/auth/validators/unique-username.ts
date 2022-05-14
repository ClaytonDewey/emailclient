import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AsyncValidator, AbstractControl } from "@angular/forms";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UniqueUsername implements AsyncValidator {
    constructor(private http: HttpClient) {}
    
    validate = (control: AbstractControl) => {
        const { value } = control;

        return this.http.post<any>('https://api.angular-email.com/auth/username', {
            username: value 
        }).pipe(
            map((value) => {
                if (value.available) {
                    return null;
                } else {
                    return value;
                }
            }),
            catchError((err) => {
                console.log(err)
                if (err.error.username) {
                    // of() = shortcut for creating new Observable
                    return of({ nonUniqueUsername: true });
                } else {
                    return of({ noConnection: true });
                }
            })
        )
    };
}

// 4:11 Nasty Async Validators