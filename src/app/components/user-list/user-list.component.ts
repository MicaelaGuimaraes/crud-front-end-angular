import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loading: boolean;
  displayedColumns: string[] = ['Select', 'Cod', 'Name', 'Email', 'Age', 'Address', 'Functions'];
  listCheckBox: User[] = [];
  dataSource: User[]

  constructor(
    private alert: ToastrService,
    private user: UserService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.UserList();
    this.loading = false;
  }

  async UserList() {
    this.loading = true;
    await this.user.getAll().subscribe(
      (res: Array<User>) => {
        this.dataSource = res;
        this.loading = false;
      },
      (error) => {
        console.log('err', error);
        this.loading = false;
        this.alert.error(
          'It was not possible to search for the data at this time.',
          error
        );
      }
    );
  }

  Edit(id: any) {
    this.router.navigate([`user/update/${id}`]);
  }

  addItemRemove(event: boolean, item: User) {
    if (event) {
      this.listCheckBox.push(item);
    } else {
      let index = this.listCheckBox
        .map((x, i) => {
          return { index: i, cod: x.id };
        })
        .filter((x) => {
          return x.cod == item.id;
        })[0].index;
      this.listCheckBox.splice(index, 1);
    }
  }

  async disableColor() {
    this.loading = true;
    this.listCheckBox.forEach((reg) => {
      this.user.delete(reg.id).subscribe(
        (res) => {
          this.loading = false;
          this.alert.success('Registration deleted successfully.');
          this.UserList();
          this.listCheckBox = [];
        },
        (error) => {
          this.loading = false;
          this.UserList();
          this.listCheckBox = [];
          this.alert.error(
            'It was not possible to delete the records at this time.',
            error
          );
        }
      );
    });
  }

  Logout() {
    localStorage.removeItem("jwt");
    this.router.navigate(["login"]);
  }
}
