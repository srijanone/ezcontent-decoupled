import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Component({
    templateUrl: './login.component.html',
    selector: "app-login",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        const headers = { 'Content-Type': 'application/json' }
        const AuthBody = { 
            "username": this.f.username.value,
            "password": this.f.password.value
        }
        this.http.post<any>(environment.apiHost + '/api/v1/login', AuthBody, { headers }).subscribe(response => {

            const token = response;
            localStorage.setItem("token", JSON.stringify(token));
            let premium_url = localStorage.getItem('premium_url');
            if(premium_url){
                localStorage.removeItem('premium_url');
                window.location.replace(premium_url);
            }else{
                window.location.replace('/');
            }
            
        }, (error) => {
            alert("Invalid Credentials");
        }); 
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('premium_url');
    }

}
