import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

    /*public loginForm = new FormGroup({
        email: new FormControl(''),
        password:  new FormControl('')
    });*/

    public loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })

    constructor(public apiAuthService: ApiAuthService, private router: Router, private formBuilder: FormBuilder){
        //it check if it have informations, tought/aunque it not be a bool
        /*if(this.apiAuthService.usuarioData){
            this.router.navigate(['/'])
        }*/
    }
    
    ngOnInit(){

    }

    login(){
        this.apiAuthService.login(this.loginForm.value).subscribe(response => {
            if(response.exito === 1){
                this.router.navigate(['/'])
            }
        })
    }
}