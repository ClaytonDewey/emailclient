import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AsyncValidator, AbstractControl } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class UniqueUsername implements AsyncValidator {
    constructor(private http: HttpClient) {}
    
    validate(control: AbstractControl) {
        console.log('value', control.value);

        return control.value;
    }
}

// 4:11 Nasty Async Validators