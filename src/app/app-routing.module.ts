import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "home",
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/new",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/update/:id",
    component: UserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
