import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading: boolean;
  id: any;
  UserName: string;

  Form = this._form.group({
    id: [0],
    age: [null, Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    createDate: [null],
  });

  constructor(
    private user: UserService,
    private route: ActivatedRoute,
    private _form: FormBuilder,
    private alert: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.user.getById(this.id).subscribe((res: User) => {
        this.UserName = res.name;
        this.Form.patchValue(res);
      });
    }
  }

  async Save() {
    this.loading = true;
    if (this.Form.controls['id'].value != 0) {
      this.user
        .put(this.Form.controls['id'].value, this.Form.value)
        .subscribe(
          (res) => {
            this.loading = false;
            this.alert.success('Registration updated successfully.');
            this.router.navigate(['/home']);
          },
          (erro) => {
            console.log('err', erro);
            this.loading = false;
            this.alert.error(
              'We were unable to update the record at this time.',
              erro
            );
          }
        );
    } else {
      this.user.post(this.Form.value).subscribe(
        () => {
          this.loading = false;
          this.alert.success('Registration successfully registered.');
          this.router.navigate(['/home']);
        },
        (erro) => {
          console.log('err', erro);
          this.loading = false;
          this.alert.error(
            'It was not possible to register the record at this time.',
            erro
          );
        }
      );
    }
  }

}
