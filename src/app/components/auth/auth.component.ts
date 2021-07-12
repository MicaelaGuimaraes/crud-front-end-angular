import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  Form = this._form.group({
    email: ['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private _form: FormBuilder,
    private alert: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.Form.controls['email'].value)
    this.auth.login(this.Form.value).subscribe(response => {
      console.log("response", response)
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.router.navigate(["/home"]);
    }, err => {

    });
  }
}
