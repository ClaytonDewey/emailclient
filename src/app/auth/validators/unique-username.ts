import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl } from "@angular/forms";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root"
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {}
    
    validate = (control: AbstractControl) => {
        const { value } = control;

        return this.authService.usernameAvailable(value)
        .pipe(
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